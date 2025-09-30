import StatusBadge from "../StatusBadge";
import clsx from "clsx";

const statusTabs = [
  { label: "มีในสต๊อค", value: "AVAILABLE", color: "#34D399" },
  { label: "ไม่พร้อมใช้งาน", value: "UNAVAILABLE", color: "#6FA5F7" },
  { label: "ซ่อมบำรุง", value: "REPAIR", color: "#FFD000" },
  { label: "อนุมัติ", value: "APPROVED", color: "#34D399" },
  { label: "รออนุมัติ", value: "PENDING", color: "#6FA5F7" },
  { label: "ปฏิเสธ", value: "REJECTED", color: "#EF4444" },
];

export interface Device {
  id: string;
  name: string;
  status: string; // ได้จาก backend เช่น AVAILABLE
  image: string;
  employee?: string;
  updatedAt?: string;
}

interface DeviceCardProps {
  className?: string;
  onClick?: () => void;
  device: Device;
}

const DeviceCard = ({ className, onClick, device }: DeviceCardProps) => {
  // หา label ไทยที่ตรงกับ status
  const matchedStatus = statusTabs.find((s) => s.value === device.status || s.label === device.status);

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
