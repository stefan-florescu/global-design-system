"use client";

import { cn } from "@stefan-florescu/ui";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

import { formatDateTime, formatShortDate, type SeriesPoint } from "@/lib/view";

/*
 * The price history chart (plan screen 6): a thin line per series on one price axis, with the
 * lowest, highest and average marked. Drawn as SVG with token colours, so it follows the theme.
 * Hover or focus it and use ← / → to read exact prices.
 */

/**
 * Series colours in a fixed order, assigned by store (never by rank), so a store keeps its colour
 * when the range changes. Checked for colour-blind separation in light mode; in dark mode the
 * lines are also labelled directly and listed in the legend, so colour is never the only cue.
 */
export const seriesColors = [
  { stroke: "stroke-fg-brand", fill: "fill-fg-brand", swatch: "bg-fg-brand" },
  {
    stroke: "stroke-fg-warning-subtle",
    fill: "fill-fg-warning-subtle",
    swatch: "bg-fg-warning-subtle",
  },
  { stroke: "stroke-fg-cyan", fill: "fill-fg-cyan", swatch: "bg-fg-cyan" },
  { stroke: "stroke-fg-pink", fill: "fill-fg-pink", swatch: "bg-fg-pink" },
  { stroke: "stroke-fg-lime", fill: "fill-fg-lime", swatch: "bg-fg-lime" },
  { stroke: "stroke-fg-purple", fill: "fill-fg-purple", swatch: "bg-fg-purple" },
] as const;

export type ChartSeries = {
  id: string;
  label: string;
  color: (typeof seriesColors)[number];
  points: SeriesPoint[];
};

const height = 280;
const margin = { top: 16, right: 16, bottom: 28 };

function niceTicks(min: number, max: number, count = 4) {
  const span = max - min || Math.abs(max) || 1;
  const step = 10 ** Math.floor(Math.log10(span / count));
  const nice = [1, 2, 2.5, 5, 10].map((m) => m * step).find((s) => span / s <= count) ?? step * 10;
  const ticks = [];
  for (let v = Math.ceil(min / nice) * nice; v <= max + 1e-9; v += nice)
    ticks.push(Number(v.toFixed(6)));
  return ticks;
}

export function PriceChart({
  series,
  format,
  formatAxis = format,
  label,
  showStats,
}: {
  series: ChartSeries[];
  format: (value: number | null) => string;
  /** Shorter labels for the price axis, e.g. without decimals. */
  formatAxis?: (value: number) => string;
  /** What the chart shows, e.g. "Best price, last 30 days". */
  label: string;
  /** Mark the lowest, highest and average (single-series view). */
  showStats: boolean;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);
  const [cursor, setCursor] = useState<number | null>(null);
  const descriptionId = useId();

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setWidth(Math.max(280, Math.round(entry.contentRect.width)));
    });
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  const times = useMemo(
    () => [...new Set(series.flatMap((s) => s.points.map((p) => p.at)))].sort((a, b) => a - b),
    [series],
  );
  const prices = series
    .flatMap((s) => s.points.map((p) => p.price))
    .filter((p): p is number => p !== null);

  if (times.length === 0 || prices.length === 0) {
    return (
      <p className="rounded-base border-default-medium text-body border border-dashed p-8 text-center text-sm">
        No prices in this range yet. Pick a longer range, or check back after the next price check.
      </p>
    );
  }

  const lowest = Math.min(...prices);
  const highest = Math.max(...prices);
  const average = prices.reduce((sum, p) => sum + p, 0) / prices.length;
  const pad = (highest - lowest) * 0.1 || highest * 0.05 || 1;
  const yTicks = niceTicks(lowest - pad, highest + pad);
  const yMin = Math.min(lowest - pad, yTicks[0] ?? lowest);
  const yMax = Math.max(highest + pad, yTicks.at(-1) ?? highest);
  // The price axis is as wide as its longest label (about 7px per character at text-xs).
  const left = Math.max(...yTicks.map((tick) => formatAxis(tick).length)) * 7 + 16;
  const t0 = times[0] ?? 0;
  const t1 = times.at(-1) ?? t0;
  const plotWidth = width - left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const x = (at: number) =>
    left + (t1 === t0 ? plotWidth / 2 : ((at - t0) / (t1 - t0)) * plotWidth);
  const y = (price: number) => margin.top + (1 - (price - yMin) / (yMax - yMin)) * plotHeight;

  const path = (points: SeriesPoint[]) => {
    let d = "";
    let pen = false;
    for (const p of points) {
      if (p.price === null) {
        pen = false;
        continue;
      }
      d += `${pen ? "L" : "M"}${x(p.at).toFixed(1)},${y(p.price).toFixed(1)}`;
      pen = true;
    }
    return d;
  };

  const xTickCount = Math.max(2, Math.min(6, Math.floor(plotWidth / 110)));
  const xTicks = Array.from(
    { length: xTickCount },
    (_, i) => t0 + ((t1 - t0) * i) / (xTickCount - 1),
  );

  const lowPoint = showStats ? series[0]?.points.find((p) => p.price === lowest) : undefined;
  const highPoint = showStats ? series[0]?.points.find((p) => p.price === highest) : undefined;

  const cursorAt = cursor === null ? null : (times[cursor] ?? null);
  const valuesAt = (at: number) =>
    series.map((s) => {
      let found: SeriesPoint | undefined;
      for (const p of s.points) {
        if (p.at > at) break;
        found = p;
      }
      return { series: s, price: found?.price ?? null };
    });

  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * width;
    let nearest = 0;
    for (let i = 1; i < times.length; i++) {
      if (Math.abs(x(times[i] ?? 0) - px) < Math.abs(x(times[nearest] ?? 0) - px)) nearest = i;
    }
    setCursor(nearest);
  };

  const onKeyDown = (event: KeyboardEvent<SVGSVGElement>) => {
    const last = times.length - 1;
    const moves: Record<string, number> = {
      ArrowLeft: Math.max(0, (cursor ?? last) - 1),
      ArrowRight: Math.min(last, (cursor ?? -1) + 1),
      Home: 0,
      End: last,
    };
    if (event.key in moves) {
      event.preventDefault();
      setCursor(moves[event.key] ?? null);
    } else if (event.key === "Escape") {
      setCursor(null);
    }
  };

  const summary = `${label}. Lowest ${format(lowest)}, highest ${format(highest)}, average ${format(average)}.`;
  const tooltipLeft = cursorAt === null ? 0 : x(cursorAt);

  return (
    <div className="flex flex-col gap-3">
      <div ref={boxRef} className="relative w-full">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="focus-visible:outline-brand block max-w-full touch-pan-y rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2"
          role="img"
          aria-label={summary}
          aria-describedby={descriptionId}
          tabIndex={0}
          onPointerMove={onPointerMove}
          onPointerLeave={() => setCursor(null)}
          onKeyDown={onKeyDown}
          onBlur={() => setCursor(null)}
        >
          {/* Grid and price axis */}
          {yTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={left}
                x2={width - margin.right}
                y1={y(tick)}
                y2={y(tick)}
                className="stroke-default"
                strokeWidth={1}
              />
              <text
                x={left - 8}
                y={y(tick)}
                dy="0.32em"
                textAnchor="end"
                className="fill-body-subtle text-xs"
              >
                {formatAxis(tick)}
              </text>
            </g>
          ))}
          {xTicks.map((tick, i) => (
            <text
              key={tick}
              x={x(tick)}
              y={height - 8}
              textAnchor={i === 0 ? "start" : i === xTicks.length - 1 ? "end" : "middle"}
              className="fill-body-subtle text-xs"
            >
              {formatShortDate(tick)}
            </text>
          ))}

          {showStats ? (
            <g>
              <line
                x1={left}
                x2={width - margin.right}
                y1={y(average)}
                y2={y(average)}
                className="stroke-body-subtle"
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <text
                x={width - margin.right}
                y={y(average) - 6}
                textAnchor="end"
                className="fill-body text-xs"
              >
                Avg {format(average)}
              </text>
            </g>
          ) : null}

          {series.map((s) => (
            <path
              key={s.id}
              d={path(s.points)}
              fill="none"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
              className={s.color.stroke}
            />
          ))}

          {/* Direct labels at the end of each line, when there are few enough to fit. */}
          {series.length > 1 && series.length <= 4
            ? series.map((s) => {
                const last = [...s.points].reverse().find((p) => p.price !== null);
                if (!last || last.price === null) return null;
                return (
                  <text
                    key={s.id}
                    x={x(last.at) - 4}
                    y={y(last.price) - 8}
                    textAnchor="end"
                    className="fill-heading text-xs font-medium"
                  >
                    {s.label}
                  </text>
                );
              })
            : null}

          {[
            lowPoint ? { point: lowPoint, text: `Low ${format(lowest)}`, below: true } : null,
            highPoint && highest !== lowest
              ? { point: highPoint, text: `High ${format(highest)}`, below: false }
              : null,
          ].map((mark) =>
            mark && mark.point.price !== null ? (
              <g key={mark.text}>
                <circle
                  cx={x(mark.point.at)}
                  cy={y(mark.point.price)}
                  r={4}
                  className="fill-fg-brand stroke-neutral-primary-soft"
                  strokeWidth={2}
                />
                <text
                  x={Math.min(Math.max(x(mark.point.at), left + 40), width - margin.right - 40)}
                  y={y(mark.point.price) + (mark.below ? 18 : -10)}
                  textAnchor="middle"
                  className="fill-heading text-xs font-medium"
                >
                  {mark.text}
                </text>
              </g>
            ) : null,
          )}

          {cursorAt !== null ? (
            <g>
              <line
                x1={x(cursorAt)}
                x2={x(cursorAt)}
                y1={margin.top}
                y2={height - margin.bottom}
                className="stroke-body-subtle"
                strokeWidth={1}
              />
              {valuesAt(cursorAt).map(({ series: s, price }) =>
                price === null ? null : (
                  <circle
                    key={s.id}
                    cx={x(cursorAt)}
                    cy={y(price)}
                    r={4}
                    className={cn(s.color.fill, "stroke-neutral-primary-soft")}
                    strokeWidth={2}
                  />
                ),
              )}
            </g>
          ) : null}
        </svg>

        {cursorAt !== null ? (
          <div
            className="rounded-base border-default bg-neutral-primary-soft z-tooltip pointer-events-none absolute top-2 flex min-w-40 flex-col gap-1 border p-2.5 text-xs shadow-md"
            style={
              tooltipLeft > width / 2
                ? { right: width - tooltipLeft + 12 }
                : { left: tooltipLeft + 12 }
            }
          >
            <p className="text-heading font-medium">{formatDateTime(cursorAt)}</p>
            {valuesAt(cursorAt).map(({ series: s, price }) => (
              <p key={s.id} className="text-body flex items-center gap-2">
                {series.length > 1 ? (
                  <span
                    aria-hidden
                    className={cn("size-2 shrink-0 rounded-full", s.color.swatch)}
                  />
                ) : null}
                <span className="flex-1">{s.label}</span>
                <span className="text-heading font-medium tabular-nums">
                  {price === null ? "Out of stock" : format(price)}
                </span>
              </p>
            ))}
          </div>
        ) : null}
      </div>

      <p id={descriptionId} className="sr-only">
        Focus the chart and use the left and right arrow keys to read the price at each check.
      </p>
      <div role="status" aria-live="polite" className="sr-only">
        {cursorAt === null
          ? ""
          : `${formatDateTime(cursorAt)}: ${valuesAt(cursorAt)
              .map(
                ({ series: s, price }) =>
                  `${s.label} ${price === null ? "out of stock" : format(price)}`,
              )
              .join(", ")}`}
      </div>

      {series.length > 1 ? (
        <ul className="text-body flex flex-wrap gap-x-4 gap-y-1 text-sm" aria-label="Legend">
          {series.map((s) => (
            <li key={s.id} className="flex items-center gap-2">
              <span aria-hidden className={cn("h-0.5 w-4 rounded-full", s.color.swatch)} />
              {s.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
