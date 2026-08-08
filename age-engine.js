/**
 * Advanced Chronological Age Engine
 * A zero-dependency, local client-side precision time calculator.
 */
export class ChronologicalAgeEngine {
    constructor() {
        this.animationId = null;
        this.birthDate = null;
        this.parsedInput = null;
    }

    /**
     * 1. Anti-Timezone Coercion
     * Manually parses date strings to avoid browser timezone shift bugs.
     * @param {string} dateString - Format 'YYYY-MM-DD'
     */
    setBirthDate(dateString) {
        const parts = dateString.split(/[-/]/).map(Number);
        if (parts.length !== 3) throw new Error("Invalid date format. Expected YYYY-MM-DD");
        
        const [year, month, day] = parts;
        this.parsedInput = { year, month, day };
        
        // Initialize local baseline against wall-clock time securely
        this.birthDate = new Date(year, month - 1, day, 0, 0, 0, 0);
    }

    /**
     * 2. Precision Calendar Math - Proleptic Leap Year Logic
     */
    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    getDaysInMonth(year, month) {
        // Month is 1-indexed for logical clarity
        const days = [31, this.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return days[month - 1];
    }

    /**
     * Standard Chronological Breakdown
     */
    getChronologicalBreakdown(currentDate) {
        if (!this.parsedInput) return null;
        
        const { year: bYear, month: bMonth, day: bDay } = this.parsedInput;
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();

        let years = currentYear - bYear;
        let months = currentMonth - bMonth;
        let days = currentDay - bDay;

        if (days < 0) {
            months--;
            // Cleanly resolve asymmetric end-of-month transition drops
            let prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
            let prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
            days += this.getDaysInMonth(prevYear, prevMonth);
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        return { years, months, days };
    }

    /**
     * Totals Matrix
     */
    getTotalsMatrix(currentDate) {
        if (!this.birthDate) return null;
        const msElapsed = currentDate.getTime() - this.birthDate.getTime();
        
        return {
            absoluteMs: msElapsed,
            totalHours: msElapsed / (1000 * 60 * 60),
            totalDays: msElapsed / (1000 * 60 * 60 * 24)
        };
    }

    /**
     * Milestone Predictor
     */
    getMilestonePredictor(currentDate) {
        if (!this.parsedInput) return null;
        const { month: bMonth, day: bDay } = this.parsedInput;
        
        let nextYear = currentDate.getFullYear();
        let targetDay = bDay;
        
        // Handle Feb 29th transitions for common calendar years
        if (bMonth === 2 && bDay === 29 && !this.isLeapYear(nextYear)) {
            targetDay = 28;
        }
        
        let nextAnniv = new Date(nextYear, bMonth - 1, targetDay);
        
        // If the anniversary passed this year, compute for next year
        if (nextAnniv.getTime() < currentDate.getTime()) {
            nextYear++;
            targetDay = bDay;
            if (bMonth === 2 && bDay === 29 && !this.isLeapYear(nextYear)) {
                targetDay = 28;
            }
            nextAnniv = new Date(nextYear, bMonth - 1, targetDay);
        }
        
        const msUntil = nextAnniv.getTime() - currentDate.getTime();
        return Math.ceil(msUntil / (1000 * 60 * 60 * 24));
    }

    /**
     * Planetary Translations
     */
    getPlanetaryTranslations(totalDays) {
        return {
            Mercury: totalDays / 87.969,
            Venus: totalDays / 224.7,
            Mars: totalDays / 686.971,
            Jupiter: totalDays / 4332.59
        };
    }

    /**
     * 3. requestAnimationFrame Refresh Loop
     * Utilizes a drift-corrected anchor pattern against performance.now()
     */
    startRealtimeTracking(onUpdateCallback) {
        if (!this.birthDate) throw new Error("Baseline not initialized. Call setBirthDate first.");
        
        this.stopRealtimeTracking(); 
        
        const startPerfTime = performance.now();
        const startWallTime = Date.now();

        const tick = (currentPerfTime) => {
            const elapsedMs = currentPerfTime - startPerfTime;
            const correctedWallTime = startWallTime + elapsedMs;
            const currentDate = new Date(correctedWallTime);

            const totals = this.getTotalsMatrix(currentDate);
            
            onUpdateCallback({
                breakdown: this.getChronologicalBreakdown(currentDate),
                totals: totals,
                milestoneDays: this.getMilestonePredictor(currentDate),
                planets: this.getPlanetaryTranslations(totals.totalDays),
                timestamp: correctedWallTime
            });

            this.animationId = requestAnimationFrame(tick);
        };

        this.animationId = requestAnimationFrame(tick);
    }

    stopRealtimeTracking() {
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    /**
     * 5. Utility Handlers
     */
    resetData() {
        this.stopRealtimeTracking();
        this.birthDate = null;
        this.parsedInput = null;
    }

    downloadDataDump(currentData) {
        if (!currentData) return;
        
        const content = `--- Chronological Age Dump ---\n\n${JSON.stringify(currentData, null, 2)}`;
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const downloadAnchor = document.createElement('a');
        downloadAnchor.href = url;
        downloadAnchor.download = `age_dashboard_dump_${Date.now()}.txt`;
        document.body.appendChild(downloadAnchor);
        
        downloadAnchor.click();
        
        setTimeout(() => {
            document.body.removeChild(downloadAnchor);
            URL.revokeObjectURL(url);
        }, 100);
    }
}