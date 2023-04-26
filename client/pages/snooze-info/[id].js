import Link from 'next/link';

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`/api/snooze/${params.id}`);
    if (res.status === 200) {
      return {
        props: {
          success: true
        }
      };
    } else {
      return {
        props: {
          success: false,
          message: "Unable to snooze alerts. Please try again later."
        }
      };
    }
  } catch (error) {
    return {
      props: {
        success: false,
        message: `Error: ${error.message}`
      }
    };
  }
}




function SnoozeInfo({ success, message }) {
  return (
    <div className="max-w-xl mx-auto px-4">
      {success ? (
        <>
          <h3 className="text-2xl font-semibold mb-4">Success!</h3>
          <p className="mb-4">
            Alerts for your website have been permanently snoozed. <br/>
            If you want to monitor your website again, please use the URL submission form.
          </p>
          <Link legacyBehavior href="/">
            <a className="text-blue-500 hover:text-blue-700">URL Submission Form</a>
          </Link>
        </>
      ) : (
        <>
          <h3 className="text-2xl font-semibold mb-4">Failure!</h3>
          <p className="mb-4">{message}</p>
        </>
      )}
    </div>
  );
}

export default SnoozeInfo;

