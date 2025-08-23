import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, ChatReply } from '../chat.service';

type Msg = { role: 'user' | 'assistant'; text: string };

@Component({
  selector: 'cocotera-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cocotera-chat.component.html',
  styleUrls: ['./cocotera-chat.component.css']
})
export class CocoteraChatComponent implements OnInit, AfterViewChecked {
  open = false;
  unread = 0;
  input = '';
  loading = false;
  msgs: Msg[] = [];

  // ⬇️ refs
  @ViewChild('messages') private messagesRef!: ElementRef<HTMLDivElement>;
  @ViewChild('msgInput') private inputRef!: ElementRef<HTMLInputElement>;

  private lastMsgCount = 0;

  constructor(private chat: ChatService) {}

  async ngOnInit() {
    const res = await this.chat.send('menu');
    this.msgs.push({ role: 'assistant', text: res.reply });
  }

  ngAfterViewChecked() {
    // si cambió el número de mensajes, baja al final
    if (this.msgs.length !== this.lastMsgCount) {
      this.lastMsgCount = this.msgs.length;
      this.scrollToBottom();
    }
  }

  toggle() {
    this.open = !this.open;
    if (this.open) {
      this.unread = 0;
      this.focusInput();
    }
  }
  close() { this.open = false; }

  async send(text?: string) {
    const message = (text ?? this.input).trim();
    if (!message) return;

    this.msgs.push({ role: 'user', text: message });
    this.input = '';
    this.loading = true;
    this.focusInput();

    try {
      const res: ChatReply = await this.chat.send(message);
      this.msgs.push({ role: 'assistant', text: res.reply });
      if (!this.open) this.unread = Math.min(this.unread + 1, 9);
    } catch {
      this.msgs.push({ role: 'assistant', text: 'Uy, hubo un problema. Intenta de nuevo 🙏' });
      if (!this.open) this.unread = Math.min(this.unread + 1, 9);
    } finally {
      this.loading = false;
      this.focusInput();
    }
  }

  // ⬇️ helpers
  private scrollToBottom() {
    const el = this.messagesRef?.nativeElement;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }

  private focusInput() {
    // pequeño delay para asegurar que el elemento existe/renderizó
    setTimeout(() => this.inputRef?.nativeElement?.focus(), 0);
  }
}
