import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Room, Booking } from "@/types/booking";
import { ArrowRightLeft, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface SwapGuestsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  sourceRoom: Room;
  targetRoom: Room;
  sourceBookings: Booking[];
  targetBookings: Booking[];
  onSwap: (sourceGuestIds: string[], targetGuestIds: string[]) => void;
}

export default function SwapGuestsDialog({
  isOpen,
  onClose,
  sourceRoom,
  targetRoom,
  sourceBookings,
  targetBookings,
  onSwap,
}: SwapGuestsDialogProps) {
  const [selectedSourceGuests, setSelectedSourceGuests] = useState<string[]>(
    [],
  );
  const [selectedTargetGuests, setSelectedTargetGuests] = useState<string[]>(
    [],
  );

  // Don't render if rooms are not provided
  if (!sourceRoom || !targetRoom) {
    return null;
  }

  const handleToggleSourceGuest = (bookingId: string) => {
    setSelectedSourceGuests((prev) =>
      prev.includes(bookingId)
        ? prev.filter((id) => id !== bookingId)
        : [...prev, bookingId],
    );
  };

  const handleToggleTargetGuest = (bookingId: string) => {
    setSelectedTargetGuests((prev) =>
      prev.includes(bookingId)
        ? prev.filter((id) => id !== bookingId)
        : [...prev, bookingId],
    );
  };

  const handleSwap = () => {
    if (selectedSourceGuests.length === 0 && selectedTargetGuests.length === 0) {
      alert("Пожалуйста, выберите хотя бы одного гостя для обмена");
      return;
    }

    // If only source guests selected, swap all target guests
    const sourceIds =
      selectedSourceGuests.length > 0
        ? selectedSourceGuests
        : sourceBookings.map((b) => b.id);
    const targetIds =
      selectedTargetGuests.length > 0
        ? selectedTargetGuests
        : targetBookings.map((b) => b.id);

    onSwap(sourceIds, targetIds);
    onClose();
  };

  const handleSelectAllSource = () => {
    if (selectedSourceGuests.length === sourceBookings.length) {
      setSelectedSourceGuests([]);
    } else {
      setSelectedSourceGuests(sourceBookings.map((b) => b.id));
    }
  };

  const handleSelectAllTarget = () => {
    if (selectedTargetGuests.length === targetBookings.length) {
      setSelectedTargetGuests([]);
    } else {
      setSelectedTargetGuests(targetBookings.map((b) => b.id));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-purple-800">
            <ArrowRightLeft className="w-6 h-6" />
            Обмен гостями между номерами
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Info Banner */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-800">
              <strong>Выберите гостей для обмена:</strong> Вы можете выбрать
              одного или нескольких гостей из каждого номера. Выбранные гости
              поменяются местами между номерами.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Source Room */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-blue-900">
                      Номер {sourceRoom.number}
                    </h3>
                    <p className="text-sm text-blue-700">
                      Гостей: {sourceBookings.length}/{sourceRoom.capacity}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSelectAllSource}
                    className="border-blue-300 text-blue-700"
                  >
                    {selectedSourceGuests.length === sourceBookings.length
                      ? "Снять все"
                      : "Выбрать все"}
                  </Button>
                </div>

                <div className="space-y-3">
                  {sourceBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className={cn(
                        "p-4 rounded-lg border-2 cursor-pointer transition-all",
                        selectedSourceGuests.includes(booking.id)
                          ? "border-blue-500 bg-blue-100"
                          : "border-blue-200 bg-white hover:border-blue-400",
                      )}
                      onClick={() => handleToggleSourceGuest(booking.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "w-5 h-5 rounded border-2 flex items-center justify-center mt-1",
                              selectedSourceGuests.includes(booking.id)
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-300",
                            )}
                          >
                            {selectedSourceGuests.includes(booking.id) && (
                              <span className="text-white text-xs">✓</span>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-blue-900 flex items-center gap-2">
                              <User className="w-4 h-4" />
                              {booking.guestName}
                            </div>
                            <div className="text-sm text-blue-700 mt-1">
                              {booking.guestPhone}
                            </div>
                            <div className="text-xs text-blue-600 mt-1">
                              {booking.checkInDate.toLocaleDateString("ru-RU")}{" "}
                              - {booking.checkOutDate.toLocaleDateString("ru-RU")}
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-800 border-blue-300"
                        >
                          {booking.status === "checked_in"
                            ? "Заселен"
                            : "Забронирован"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Target Room */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-green-900">
                      Номер {targetRoom.number}
                    </h3>
                    <p className="text-sm text-green-700">
                      Гостей: {targetBookings.length}/{targetRoom.capacity}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSelectAllTarget}
                    className="border-green-300 text-green-700"
                  >
                    {selectedTargetGuests.length === targetBookings.length
                      ? "Снять все"
                      : "Выбрать все"}
                  </Button>
                </div>

                <div className="space-y-3">
                  {targetBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className={cn(
                        "p-4 rounded-lg border-2 cursor-pointer transition-all",
                        selectedTargetGuests.includes(booking.id)
                          ? "border-green-500 bg-green-100"
                          : "border-green-200 bg-white hover:border-green-400",
                      )}
                      onClick={() => handleToggleTargetGuest(booking.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "w-5 h-5 rounded border-2 flex items-center justify-center mt-1",
                              selectedTargetGuests.includes(booking.id)
                                ? "border-green-500 bg-green-500"
                                : "border-gray-300",
                            )}
                          >
                            {selectedTargetGuests.includes(booking.id) && (
                              <span className="text-white text-xs">✓</span>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-green-900 flex items-center gap-2">
                              <User className="w-4 h-4" />
                              {booking.guestName}
                            </div>
                            <div className="text-sm text-green-700 mt-1">
                              {booking.guestPhone}
                            </div>
                            <div className="text-xs text-green-600 mt-1">
                              {booking.checkInDate.toLocaleDateString("ru-RU")}{" "}
                              - {booking.checkOutDate.toLocaleDateString("ru-RU")}
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 border-green-300"
                        >
                          {booking.status === "checked_in"
                            ? "Заселен"
                            : "Забронирован"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">
              Итоговый обмен:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-purple-800">
                  <strong>Из номера {sourceRoom.number}:</strong>
                </p>
                <p className="text-purple-700">
                  {selectedSourceGuests.length > 0
                    ? `${selectedSourceGuests.length} гост${selectedSourceGuests.length === 1 ? "ь" : selectedSourceGuests.length < 5 ? "я" : "ей"}`
                    : "Не выбрано"}
                </p>
              </div>
              <div>
                <p className="text-purple-800">
                  <strong>Из номера {targetRoom.number}:</strong>
                </p>
                <p className="text-purple-700">
                  {selectedTargetGuests.length > 0
                    ? `${selectedTargetGuests.length} гост${selectedTargetGuests.length === 1 ? "ь" : selectedTargetGuests.length < 5 ? "я" : "ей"}`
                    : "Не выбрано"}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button
              onClick={handleSwap}
              className="bg-purple-600 hover:bg-purple-700"
              disabled={
                selectedSourceGuests.length === 0 &&
                selectedTargetGuests.length === 0
              }
            >
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Поменять местами
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
