import { useRouter } from 'next/router';

function SnoozeInfo() {
  const router = useRouter();
  const { url } = router.query;

  return (
    <div className="flex flex-col items-center mt-8">
      <h3 className="text-lg font-medium mb-4">Success!</h3>
      <p className="text-center mb-4">Alerts for {url} have been permanently snoozed.</p>
      <p className="text-center mb-8">If you want to monitor your website again, please use the URL submission form.</p>
      <a href="/" className="text-blue-500 hover:text-blue-700 underline">Back to home page</a>
    </div>
  );
}

export default SnoozeInfo;
