import { Device } from "@/Interfaces/devices.interface";
import StatusBadge from "../StatusBadge";
import clsx from "clsx";
import { STATUS_FILTERS } from "@/Shared/Constants/status";

interface DeviceCardProps {
  className?: string;
  onClick?: () => void;
  device: Device;
}

const DeviceCard = ({ className, onClick, device }: DeviceCardProps) => {
  const matchedStatus = STATUS_FILTERS.find((s) => s.value === device.status || s.label === device.status);

  return (
    <div className={clsx("flex flex-col w-[14vw] h-[15vw] rounded-[8px] bg-[#00000052]", className)} onClick={onClick}>
      <div className="w-full aspect-[4/3] overflow-hidden rounded-t-[8px]">
        <img
          className="w-full h-full object-cover"
          src={device.image}
          alt={device.name}
        />
      </div>


      <div className="flex flex-col p-3">
        <p className="font-sukhumvit text-[10px] text-[#DCDCDC]">#{device.id}</p>
        <p className="font-sukhumvit-bold text-[16px] text-white pb-1 truncate">
          {device.name}
        </p>
        <div className="flex flex-row justify-between items-center">
          <StatusBadge status={matchedStatus ? matchedStatus.label : device.status} />
          <p className="font-sukhumvit text-[12px] text-[#DCDCDC]">
            {device.updatedAt ? new Date(device.updatedAt).toISOString().split("T")[0] : "-"}
          </p>
        </div>
      </div>

    </div>
  );
};

export default DeviceCard;
