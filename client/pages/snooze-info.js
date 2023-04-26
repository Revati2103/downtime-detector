import Link from 'next/link';



function SnoozeInfo() {
  return (
    <div className="max-w-xl mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-4 mt-4">Success!</h3>
          <p className="mb-4">
            Alerts for your website have been permanently snoozed. <br/>
            If you want to monitor your website again, please use the URL submission form.
          </p>
          <Link legacyBehavior href="/">
            <a className="text-blue-500 hover:text-blue-700">URL Submission Form</a>
          </Link>
    </div>
  );
}

export default SnoozeInfo;

