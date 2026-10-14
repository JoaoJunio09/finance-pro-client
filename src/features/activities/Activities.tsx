import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarView } from "./components/CalendarView/CalendarView";
import { DayDetailsDrawer } from "./components/DayDetailsDrawer/DayDetailsDrawer";
import useActivities from "./hooks/useActivities";
import flowStyles from "../financialLife/FinancialLife.module.css";

export default function Activities({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { activities, currentMonth, setCurrentMonth } = useActivities();
  const changeMonth = (offset: number) =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1)
    );

  return (
    <section className={embedded ? undefined : flowStyles.content}>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold capitalize">
          {currentMonth.toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            className={flowStyles.tab}
            onClick={() => changeMonth(-1)}
            aria-label="Mês anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className={flowStyles.tab}
            onClick={() => changeMonth(1)}
            aria-label="Próximo mês"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <CalendarView
        currentMonth={currentMonth}
        activities={activities}
        onDayClick={(date) => {
          setSelectedDate(date);
          setDrawerOpen(true);
        }}
      />
      <DayDetailsDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        selectedDate={selectedDate}
        activities={activities}
      />
    </section>
  );
}
