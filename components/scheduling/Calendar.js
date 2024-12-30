import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, addWeeks, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Users, Video, Music } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const LESSON_TYPES = {
  PRIVATE: {
    name: 'Private Lesson',
    price: 95,
    icon: Music,
    color: 'text-orange-500'
  },
  JAM: {
    name: 'Jam Session',
    price: 25,
    icon: Users,
    color: 'text-green-600'
  },
  ZOOM: {
    name: 'Zoom Class',
    price: 25,
    icon: Video,
    color: 'text-blue-600'
  }
};

const SCHEDULE = {
  MONDAY: {
    type: 'JAM',
    times: ['9:00', '10:00', '11:00', '12:00', '1:00', '2:00'],
    maxCapacity: 25
  },
  TUESDAY: {
    type: 'PRIVATE',
    times: ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00']
  },
  WEDNESDAY: {
    type: 'PRIVATE',
    times: ['7:30', '8:30', '9:30', '10:30', '11:30', '12:30', '1:30']
  },
  THURSDAY: {
    type: 'PRIVATE',
    times: ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00']
  },
  FRIDAY: {
    type: 'PRIVATE',
    times: ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00'],
    zoomClasses: {
      '9:00': 'Old-Time Fiddle Groove',
      '10:00': 'Twin Fiddles',
      '11:00': 'Swing Time',
      '12:00': 'Contemporary Tunes',
      '1:00': 'Bluegrass Fiddles & Soloing'
    }
  }
};

const Calendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const getDaysInWeek = (startDate) => {
    const days = [];
    let currentDate = startOfWeek(startDate, { weekStartsOn: 1 });
    for (let i = 0; i < 5; i++) {
      days.push(addDays(currentDate, i));
    }
    return days;
  };

  const weekDays = getDaysInWeek(currentWeek);

  const getAvailableSlots = (date) => {
    const dayName = format(date, 'EEEE').toUpperCase();
    return SCHEDULE[dayName] || { times: [] };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Week Navigation */}
        <Card className="bg-white/95 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl text-blue-900">
                <CalendarIcon className="inline-block mr-2 h-6 w-6" />
                Schedule a Lesson
              </CardTitle>
              <div className="space-x-4">
                <button
                  onClick={() => setCurrentWeek(addWeeks(currentWeek, -1))}
                  className="px-4 py-2 text-blue-600 hover:text-blue-800"
                >
                  Previous Week
                </button>
                <button
                  onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
                  className="px-4 py-2 text-blue-600 hover:text-blue-800"
                >
                  Next Week
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              {weekDays.map((day) => (
                <button
                  key={day.toString()}
                  onClick={() => setSelectedDate(day)}
                  className={`p-4 rounded-lg transition-all ${
                    selectedDate && isSameDay(day, selectedDate)
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <p className="font-medium text-gray-900">{format(day, 'EEEE')}</p>
                  <p className="text-lg text-blue-900">{format(day, 'MMM d')}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time Slots */}
        {selectedDate && (
          <Card className="bg-white/95 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">
                <Clock className="inline-block mr-2 h-5 w-5" />
                Available Times for {format(selectedDate, 'EEEE, MMMM d')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {getAvailableSlots(selectedDate).times.map((time) => {
                  const daySchedule = SCHEDULE[format(selectedDate, 'EEEE').toUpperCase()];
                  const isZoomClass = daySchedule.zoomClasses?.[time];
                  const LessonIcon = LESSON_TYPES[daySchedule.type].icon;

                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedTime === time
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <LessonIcon className={`w-5 h-5 ${LESSON_TYPES[daySchedule.type].color}`} />
                        <span className="text-lg font-medium">{time}</span>
                      </div>
                      {isZoomClass && (
                        <p className="text-sm text-gray-600">{isZoomClass}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Calendar;