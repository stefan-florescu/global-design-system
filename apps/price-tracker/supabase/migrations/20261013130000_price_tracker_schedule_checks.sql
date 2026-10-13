-- Every 15 minutes, ask the price-tracker function to check products whose next check is due
-- (ADR 0011). The function only checks due products, so the call needs no secret.
-- Replace the project URL when applying to another project.
select cron.schedule(
  'price-tracker-check-due',
  '*/15 * * * *',
  $$select net.http_post(
      url := 'https://ssizcmwaarxqwxoopksw.supabase.co/functions/v1/price-tracker',
      body := '{"action":"check-due"}'::jsonb,
      headers := '{"Content-Type":"application/json"}'::jsonb,
      timeout_milliseconds := 120000
    )$$
);
