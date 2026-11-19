import process from 'node:process';

const { VITE_SUPABASE_URL: projectUrl, VITE_SUPABASE_PUBLISHABLE_KEY: key } = process.env;

try {
  if (!projectUrl || !key?.startsWith('sb_publishable_')) {
    throw new Error('Set the Supabase project URL and a publishable key in .env.local.');
  }

  const url = new URL('/rest/v1/drug', projectUrl);
  if (url.protocol !== 'https:') throw new Error('Use the HTTPS project URL from Supabase.');

  // Require a linked trade name and disease use so one row proves both links work.
  url.searchParams.set('select', 'generic_name,mechanism_of_action,trade_name!inner(name),disease_use!inner(description)');
  url.searchParams.set('limit', '1');

  const response = await fetch(url, {
    headers: { apikey: key },
    redirect: 'error',
    signal: AbortSignal.timeout(10_000),
  }).catch(() => {
    throw new Error('Could not reach Supabase. Check your internet connection and project URL.');
  });

  if (!response.ok) throw new Error(`Supabase returned HTTP ${response.status}.`);

  const [drug] = await response.json();
  if (!drug?.generic_name || !drug.mechanism_of_action || !drug.trade_name?.length || !drug.disease_use?.length) {
    throw new Error('Supabase responded, but no readable drug with both linked fields was found.');
  }

  console.log([
    `  Generic name: ${drug.generic_name}`,
    `  Mechanism: ${drug.mechanism_of_action}`,
    `  Trade names: ${drug.trade_name.map(({ name }) => name).join(', ')}`,
    `  Disease uses: ${drug.disease_use.map(({ description }) => description).join(', ')}`,
  ].join('\n'));
} catch (error) {
  // Keep credentials and response contents out of terminal output.
  const message = error instanceof TypeError || error instanceof SyntaxError
    ? 'Check the project URL and API response.'
    : error.message;
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}
