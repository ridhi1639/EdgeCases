// Edge Cases — Daily Streak & Activity Calendar Component
import React, { useState } from 'react';
import {
  Flame,
  Zap,
  Calendar,
  Shield,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

export default function StreakCalendar({ user, onExtendStreak }) {
  const [streakCount, setStreakCount] = useState(user?.streak || 7);
  const [todayCompleted, setTodayCompleted] = useState(true);
  const [selectedDay, setSelectedDay] = useState({
    day: 27,
    dateStr: 'Tuesday, October 27, 2026',
    problems: 2,
    battles: 1,
    ratingGain: '+24',
    status: 'Streak Maintained',
  });

  // Current month: October 2026 (31 days)
  // 1st of Oct 2026 was Thursday (index 3, where Monday = 0)
  const totalDaysInMonth = 31;
  const startDayOffset = 3; // 3 empty slots for Mon, Tue, Wed

  // Active streak days in October 2026
  const [activeDays, setActiveDays] = useState(
    new Set([1, 2, 4, 5, 8, 9, 10, 12, 14, 15, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27])
  );

  const todayDate = 27;

  const handleTileClick = (d) => {
    if (d > totalDaysInMonth) return;
    const isActive = activeDays.has(d);
    setSelectedDay({
      day: d,
      dateStr: `October ${d}, 2026`,
      problems: isActive ? (d === todayDate ? 2 : Math.floor((d * 7) % 3) + 1) : 0,
      battles: isActive ? (d % 2 === 0 ? 1 : 0) : 0,
      ratingGain: isActive ? `+${(d % 15) + 10}` : '+0',
      status: isActive ? 'Streak Maintained' : d > todayDate ? 'Upcoming Day' : 'Inactive (Freeze Shield Used)',
    });
  };

  const handleExtendStreak = () => {
    if (!activeDays.has(todayDate)) {
      const next = new Set(activeDays);
      next.add(todayDate);
      setActiveDays(next);
      setTodayCompleted(true);
      const newStreak = streakCount + 1;
      setStreakCount(newStreak);
      if (onExtendStreak) onExtendStreak(newStreak);
    } else {
      // Simulate extra practice session today
      setSelectedDay({
        day: todayDate,
        dateStr: `Tuesday, October 27, 2026`,
        problems: selectedDay.problems + 1,
        battles: 1,
        ratingGain: '+38',
        status: 'Streak Maintained (+1 Problem Solved!)',
      });
    }
  };

  // Generate 16 weeks of rolling contribution heatmap data
  const heatmapWeeks = Array.from({ length: 16 }, (_, w) => {
    return Array.from({ length: 7 }, (_, d) => {
      // More activity in recent weeks
      const seed = (w * 7 + d * 13) % 10;
      if (w > 12 && seed > 2) return Math.min(4, Math.floor(seed / 2) + 1);
      if (seed > 6) return 3;
      if (seed > 3) return 2;
      if (seed > 1) return 1;
      return 0;
    });
  });

  return (
    <div className="streak-hero-card anim-fade-up">
      <div className="streak-card-glow" />

      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#FACC15', letterSpacing: '0.08em', marginBottom: '6px' }}>
            <Flame size={14} className="tile-flame-icon" />
            <span>DAILY CODING STREAK</span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#ECEEEF', letterSpacing: '-0.02em' }}>
            {streakCount} Days Daily Streak 🔥
          </h2>
          <p style={{ fontSize: '13px', color: '#969DA5', marginTop: '2px' }}>
            Solve at least 1 edge case problem or win a 1v1 battle daily to keep your fire burning.
          </p>
        </div>

        <button
          className="btn btn-primary btn-md"
          onClick={handleExtendStreak}
          style={{ background: 'linear-gradient(135deg, #FACC15 0%, #EAB308 100%)', color: '#0A0C10', fontWeight: 700, border: 'none' }}
        >
          <Flame size={16} fill="#0A0C10" />
          <span>Maintain Today's Streak</span>
        </button>
      </div>

      {/* 4 Metric Boxes */}
      <div className="streak-metrics-grid">
        <div className="streak-metric-box">
          <div className="streak-metric-icon" style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#FACC15' }}>
            <Flame size={20} fill="#FACC15" />
          </div>
          <div>
            <div className="streak-metric-value">{streakCount} Days</div>
            <div className="streak-metric-label">Current Streak</div>
          </div>
        </div>

        <div className="streak-metric-box">
          <div className="streak-metric-icon" style={{ background: 'rgba(197, 244, 103, 0.15)', color: '#C5F467' }}>
            <Zap size={20} />
          </div>
          <div>
            <div className="streak-metric-value">19 Days</div>
            <div className="streak-metric-label">Longest Streak</div>
          </div>
        </div>

        <div className="streak-metric-box">
          <div className="streak-metric-icon" style={{ background: 'rgba(138, 180, 248, 0.15)', color: '#8AB4F8' }}>
            <Calendar size={20} />
          </div>
          <div>
            <div className="streak-metric-value">48 Days</div>
            <div className="streak-metric-label">Total Active Days</div>
          </div>
        </div>

        <div className="streak-metric-box">
          <div className="streak-metric-icon" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#C084FC' }}>
            <Shield size={20} />
          </div>
          <div>
            <div className="streak-metric-value">2 Active</div>
            <div className="streak-metric-label">Streak Freezes</div>
          </div>
        </div>
      </div>

      {/* Monthly Interactive Calendar */}
      <div className="streak-calendar-wrapper">
        <div className="calendar-top-bar">
          <div className="calendar-month-title">
            <Calendar size={18} style={{ color: '#FACC15' }} />
            <span>October 2026</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="calendar-streak-status-pill">
              <CheckCircle2 size={13} />
              Streak Active Today
            </span>
          </div>
        </div>

        {/* Weekday Labels */}
        <div className="calendar-weekdays-row">
          <div className="calendar-weekday">Mon</div>
          <div className="calendar-weekday">Tue</div>
          <div className="calendar-weekday">Wed</div>
          <div className="calendar-weekday">Thu</div>
          <div className="calendar-weekday">Fri</div>
          <div className="calendar-weekday">Sat</div>
          <div className="calendar-weekday">Sun</div>
        </div>

        {/* Days Grid */}
        <div className="calendar-grid-days">
          {/* Empty padding days before Oct 1 */}
          {Array.from({ length: startDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="calendar-tile is-empty" />
          ))}

          {/* Month Days 1 to 31 */}
          {Array.from({ length: totalDaysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const isActive = activeDays.has(dayNum);
            const isToday = dayNum === todayDate;
            const isFuture = dayNum > todayDate;
            const isSelected = selectedDay?.day === dayNum;

            return (
              <div
                key={`day-${dayNum}`}
                className={`calendar-tile ${isActive ? 'is-active' : ''} ${isToday ? 'is-today' : ''} ${
                  isFuture ? 'is-future' : ''
                }`}
                style={{
                  outline: isSelected ? '2px solid #C5F467' : undefined,
                  cursor: 'pointer',
                }}
                onClick={() => handleTileClick(dayNum)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span className="tile-date-num">{dayNum}</span>
                  {isToday && <Flame size={12} fill="#EAB308" className="tile-flame-icon" />}
                </div>

                {isActive && (
                  <div className="tile-streak-indicator">
                    <CheckCircle2 size={11} />
                    <span>Active</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Day Details Card */}
        {selectedDay && (
          <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(197, 244, 103, 0.15)', color: '#C5F467', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                {selectedDay.day}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ECEEEF' }}>{selectedDay.dateStr}</div>
                <div style={{ fontSize: '11px', color: '#969DA5' }}>
                  {selectedDay.problems} problems solved • {selectedDay.battles} 1v1 battle • Rating: {selectedDay.ratingGain}
                </div>
              </div>
            </div>

            <span className="badge badge-accent" style={{ fontSize: '11px' }}>
              {selectedDay.status}
            </span>
          </div>
        )}

        {/* Contribution Activity Heatmap */}
        <div className="heatmap-container">
          <div className="heatmap-title-row">
            <span className="heatmap-title">Contribution Activity (Last 16 Weeks)</span>
            <span style={{ fontSize: '11px', color: '#68707B' }}>384 submissions in 2026</span>
          </div>

          <div className="heatmap-scroll-area">
            <div className="heatmap-columns-grid">
              {heatmapWeeks.map((week, wIdx) => (
                <div key={wIdx} className="heatmap-column">
                  {week.map((level, dIdx) => (
                    <div
                      key={dIdx}
                      className={`heatmap-cell level-${level}`}
                      title={`Week ${wIdx + 1}, Day ${dIdx + 1}: ${level * 2} edge cases passed`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="heatmap-legend">
            <span>Less</span>
            <div className="heatmap-cell level-0" />
            <div className="heatmap-cell level-1" />
            <div className="heatmap-cell level-2" />
            <div className="heatmap-cell level-3" />
            <div className="heatmap-cell level-4" />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
