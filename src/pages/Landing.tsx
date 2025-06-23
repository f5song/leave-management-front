import { Card } from "@/components/ui/card";
import Navbar from "@/components/ui/navbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import Sidebar from "@/components/ui/sidebar";
import { DateSelectArg } from "@fullcalendar/core";
import { Dialog } from "@headlessui/react";
import { format, differenceInCalendarDays, addDays } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLeave, getLeaves, LeaveInput } from "@/services/leaveService";
import { useAuth } from "@/contexts/AuthContext";
const Landing = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cachedLeaves, setCachedLeaves] = useState<any[]>([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    leaveTypeId: "SICK",
  });

  const todayStr = format(new Date(), "yyyy-MM-dd");

  const mutation = useMutation({
    mutationFn: (newLeave: LeaveInput) => createLeave(user.id, newLeave),
    onSuccess: async (data) => {
      const { title, description, startDate, endDate, totalDays } = data;
      setCalendarEvents((prev) => [
        ...prev,
        {
          title,
          start: startDate,
          end: endDate,
          allDay: true, 
          color: "#8a8a8as",
          extendedProps: {
            description,
            totalDays,
          },
        },
      ]);
      setIsModalOpen(false);
      await refetchLeaves();
    },
    onError: (error: any) => {
      alert("❌ บันทึกวันลาไม่สำเร็จ");
      console.error(error);
    },
  });

  const [visibleRange, setVisibleRange] = useState<{ start: string; end: string } | null>(null);

  const { data: allLeaves, refetch: refetchLeaves } = useQuery({
    queryKey: ["leaves", visibleRange],
    queryFn: () => getLeaves(visibleRange?.start, visibleRange?.end),
    enabled: !!visibleRange,
  });

  // const { data: allLeaves, refetch: refetchLeaves } = useQuery({
  //   queryKey: ["leaves"],
  //   queryFn: () => getLeaves(),
  //   enabled: true,
  // });



  useEffect(() => {
    if (allLeaves?.data && Array.isArray(allLeaves.data)) {
      const mappedEvents = allLeaves.data.map((leave: any) => ({
        title: leave.title,
        start: leave.startDate,
        end: format(addDays(new Date(leave.endDate), 1), "yyyy-MM-dd"),
        color: "#8a8a8a",
        allDay: true, 
        extendedProps: {
          description: leave.description,
          totalDays: leave.totalDays,
          status: leave.status,
        },
      }));

      setCachedLeaves(mappedEvents); 
      setCalendarEvents(mappedEvents); 
    }
  }, [allLeaves]);



  // console.log("allLeaves", allLeaves);


  const handleDateClick = (arg: DateSelectArg) => {
    const dateStr = format(arg.start, "yyyy-MM-dd");
    // setVisibleRange({ start: dateStr, end: dateStr });
    setForm({
      title: "",
      description: "",
      startDate: dateStr,
      endDate: dateStr,
      leaveTypeId: "SICK",
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { title, description, startDate, endDate, leaveTypeId } = form;

    if (new Date(startDate) < new Date(todayStr) || new Date(endDate) < new Date(todayStr)) {
      alert("❌ ไม่สามารถลาวันในอดีตได้");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert("❌ วันสิ้นสุดต้องไม่ก่อนวันเริ่มต้น");
      return;
    }

    const totalDays = differenceInCalendarDays(new Date(endDate), new Date(startDate)) + 1;

    const leaveData: LeaveInput = {
      title,
      description,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      totalDays,
      leaveTypeId,
    };
    // console.log("leaveData", leaveData);

    mutation.mutate(leaveData);
  };
  // console.log("calendarEvents", calendarEvents);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-orange-900 text-white">
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Navbar onClick={() => setIsOpen(!isOpen)} />

      <div className="p-8">
        <Card className="bg-white text-black p-4 rounded-xl shadow-md">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            selectMirror={true}
            select={handleDateClick}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            height="auto"
            events={calendarEvents.length > 0 ? calendarEvents : cachedLeaves}
            eventClick={(info) => {
              const { title, extendedProps } = info.event;
              alert(
                `📌 ชื่อการลา: ${title}\n📄 รายละเอียด: ${extendedProps.description || "-"}\n📅 จำนวนวัน: ${extendedProps.totalDays}`
              );
            }}
            datesSet={(arg) => {
              const start = format(arg.start, "yyyy-MM-dd");
              const end = format(arg.end, "yyyy-MM-dd");

              const currentMonth = format(arg.start, "MMMM yyyy"); 
              console.log(`ตอนนี้ปฏิทินแสดงเดือน: ${currentMonth}`);
              console.log(`ช่วงวันที่ถูกโหลดข้อมูล: ${start} ถึง ${end}`);

              setVisibleRange({ start, end });
            }}



          />
        </Card>
      </div>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="bg-white text-black rounded-lg p-6 shadow-xl w-full max-w-md">
          <Dialog.Title className="text-xl font-bold mb-4">ขอลา</Dialog.Title>

          <label className="block font-medium">ชื่อการลา</label>
          <input
            name="title"
            value={form.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md mb-3"
            placeholder="เช่น ลาป่วย, ลาพักร้อน"
          />

          <label className="block font-medium">รายละเอียด</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md mb-3"
            placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)"
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium">วันเริ่มต้น</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleInputChange}
                min={todayStr}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">วันสิ้นสุด</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleInputChange}
                min={form.startDate || todayStr}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">ประเภทการลา</label>
              <select
                name="leaveTypeId"
                value={form.leaveTypeId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="SICK">ลาป่วย</option>
                <option value="ANNUAL">ลาพักร้อน</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={() => setIsModalOpen(false)}
            >
              ยกเลิก
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
              onClick={handleSubmit}
            >
              บันทึก
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Landing;
