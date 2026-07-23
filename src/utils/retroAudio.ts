// Web Audio API Procedural 8-Bit Chiptune Music & Sound Synthesizer
// Zero external audio files required! Pure dynamic Web Audio oscillator generation.

class RetroAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private currentNoteIndex: number = 0;

  // 8-Bit RPG Chiptune Melody Note Frequencies (Hz)
  private melodyNotes: { freq: number; duration: number }[] = [
    { freq: 261.63, duration: 0.2 }, // C4
    { freq: 329.63, duration: 0.2 }, // E4
    { freq: 392.00, duration: 0.2 }, // G4
    { freq: 493.88, duration: 0.2 }, // B4
    { freq: 523.25, duration: 0.3 }, // C5
    { freq: 392.00, duration: 0.2 }, // G4
    { freq: 329.63, duration: 0.2 }, // E4
    { freq: 440.00, duration: 0.2 }, // A4
    { freq: 523.25, duration: 0.2 }, // C5
    { freq: 659.25, duration: 0.3 }, // E5
    { freq: 349.23, duration: 0.2 }, // F4
    { freq: 440.00, duration: 0.2 }, // A4
    { freq: 523.25, duration: 0.2 }, // C5
    { freq: 392.00, duration: 0.2 }, // G4
    { freq: 493.88, duration: 0.2 }, // B4
    { freq: 587.33, duration: 0.3 }  // D5
  ];

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play a single 8-bit pulse note
  public playNote(freq: number, duration: number = 0.2, type: OscillatorType = "square", volume: number = 0.05) {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Fast decay envelope for retro chiptune sound
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context policy fallback
    }
  }

  // Play menu selection sound effect
  public playSelectSound() {
    this.playNote(880, 0.08, "square", 0.08); // High A5 pulse
  }

  // Play menu hover sound effect
  public playHoverSound() {
    this.playNote(523.25, 0.05, "triangle", 0.04); // C5 soft tick
  }

  // Start background 8-bit RPG melody loop
  public startBgm() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.currentNoteIndex = 0;

    const playNext = () => {
      if (!this.isPlaying) return;
      const note = this.melodyNotes[this.currentNoteIndex];
      this.playNote(note.freq, note.duration, "square", 0.03);

      // Sub-bass triangle note
      this.playNote(note.freq / 2, note.duration * 1.5, "triangle", 0.04);

      this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melodyNotes.length;
      this.timerId = window.setTimeout(playNext, note.duration * 1000 + 50);
    };

    playNext();
  }

  // Stop background 8-bit RPG melody loop
  public stopBgm() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggleBgm(): boolean {
    if (this.isPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const retroAudio = new RetroAudioSynthesizer();
