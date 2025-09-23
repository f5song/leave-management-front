import DeviceCard from "./DeviceCard";

export const DeviceGrid = ({ devices }: { devices: any[] }) => {
  if (devices.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400">
        <p className="text-lg font-sukhumvit">ไม่พบอุปกรณ์</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap -mx-2">
      {devices.map((device) => (
        <div className="w-1/4 px-2 mb-4" key={device.id}>
          <DeviceCard device={device} />
        </div>
      ))}
    </div>
  );
};
