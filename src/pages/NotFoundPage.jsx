import BlankPage from './BlankPage';

/**
 * Unknown URLs fall back to a blank page with the shared header, so a
 * mistyped address still renders the site chrome rather than nothing.
 * No "404" copy is invented — the frame does not specify an error page.
 */
export default function NotFoundPage() {
  return <BlankPage />;
}
