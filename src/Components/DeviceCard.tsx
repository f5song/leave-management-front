import StatusBadge from "./StatusBadge";
import clsx from "clsx";

export interface Device {
  id: string;
  title: string;
  status: string;
  image: string;
  employee?: string;
  date?: string;
}

interface DeviceCardProps {
  className?: string;
  onClick?: () => void;
  device: Device;
}

const DeviceCard = ({ className, onClick, device }: DeviceCardProps) => {
  return (

    <div
      className={clsx("w-[14vw] h-[15vw] rounded-[8px] bg-[#00000052]", className)}
      onClick={onClick}
    >
      <img
        className="w-full h-[19vh] rounded-t-[8px] object-cover"
        src={device.image}
        alt={device.title}
      />

      <div className="flex flex-col p-3">
        <p className="font-sukhumvit text-[10px] text-[#DCDCDC]">#{device.id}</p>
        <p className="font-sukhumvit-bold text-[16px] text-white pb-1 truncate">
          {device.title}
        </p>
        <div className="flex flex-row justify-between items-center">
          <StatusBadge status={device.status} />
          <p className="font-sukhumvit text-[12px] text-[#DCDCDC]">
            {device.date ?? "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
