export default function Alerts({ value }) {
  if (!value) return null;

  if (value > 150) {
    return (
      <div className="bg-red-600 p-4 rounded mb-4">
        ⚠️ Unhealthy air quality detected
      </div>
    );
  }

  return (
    <div className="bg-green-600 p-4 rounded mb-4">
      ✅ Air quality is acceptable
    </div>
  );
}
