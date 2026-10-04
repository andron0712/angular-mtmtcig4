import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Movie {
  title: string;
  year: number;
  rating: number;
}

@Component({
  selector: 'my-app, app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <header class="app-header">
        <h1>🎬 Каталог фільмів</h1>
        <p class="subtitle">Практична робота: Робота з даними та прив’язка даних в Angular (Варіант 1)</p>
      </header>

      <!-- 4. Форма для додавання нового елемента -->
      <section class="card form-section">
        <h2>Додати новий фільм</h2>
        
        <div class="form-grid">
          <!-- 5. Поля, зв'язані через [(ngModel)] -->
          <div class="form-group">
            <label for="title">Назва фільму:</label>
            <input 
              id="title" 
              type="text" 
              [(ngModel)]="newMovie.title" 
              placeholder="Наприклад: Інтерстеллар" 
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="year">Рік випуску:</label>
            <input 
              id="year" 
              type="number" 
              [(ngModel)]="newMovie.year" 
              placeholder="Наприклад: 2014" 
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="rating">Рейтинг (від 1 до 10):</label>
            <input 
              id="rating" 
              type="number" 
              [(ngModel)]="newMovie.rating" 
              placeholder="Наприклад: 9" 
              min="1" 
              max="10" 
              class="form-control"
            />
          </div>
        </div>

        <!-- 6. Кнопка додавання через (click) та 11. Property Binding [disabled] -->
        <div class="form-actions">
          <button 
            type="button" 
            class="btn btn-primary" 
            [disabled]="!isFormValid" 
            (click)="addMovie()"
          >
            Додати фільм
          </button>

          <span class="validation-hint" *ngIf="!newMovie.title.trim()">
            * Введіть назву фільму для активації кнопки
          </span>
        </div>
      </section>

      <!-- 13. Лічильник загальної кількості через {{ }} -->
      <section class="stats-section">
        <div class="counter-badge">
          Всього фільмів: <strong>{{ movies.length }}</strong>
        </div>
      </section>

      <!-- 2. Виведення масиву через *ngFor -->
      <section class="movies-grid">
        <article 
          class="movie-card" 
          *ngFor="let movie of movies; let i = index"
          [ngClass]="getRatingClass(movie.rating)"
        >
          <div class="movie-header">
            <!-- 3. Виведення назви через {{ }} -->
            <h3 class="movie-title">{{ movie.title }}</h3>
            
            <!-- 9. Умовне відображення через *ngIf (якщо рейтинг >= 8) -->
            <span *ngIf="movie.rating >= 8" class="badge-recommended">
              ★ Рекомендовано
            </span>
          </div>

          <div class="movie-body">
            <p class="movie-year">
              <span class="label">Рік:</span> {{ movie.year }}
            </p>

            <!-- 10. Динамічне оформлення ngClass -->
            <p class="movie-rating">
              <span class="label">Рейтинг:</span> 
              <span class="rating-value" [ngClass]="getRatingClass(movie.rating)">
                {{ movie.rating }}/10
              </span>
            </p>
          </div>

          <div class="movie-footer">
            <!-- 12. Кнопка видалення через (click) -->
            <button 
              type="button" 
              class="btn btn-danger" 
              (click)="deleteMovie(i)"
            >
              🗑️ Видалити
            </button>
          </div>
        </article>

        <div class="empty-state" *ngIf="movies.length === 0">
          <p>Список фільмів порожній.</p>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
    .container {
      max-width: 800px;
      margin: 20px auto;
      padding: 0 15px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #2d3748;
    }
    .app-header {
      text-align: center;
      margin-bottom: 20px;
    }
    .app-header h1 {
      margin-bottom: 5px;
      color: #1a202c;
    }
    .subtitle {
      color: #718096;
      font-size: 0.95rem;
      margin-top: 0;
    }
    .card {
      background: #ffffff;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      border: 1px solid #e2e8f0;
      margin-bottom: 20px;
    }
    .card h2 {
      margin-top: 0;
      margin-bottom: 15px;
      color: #2b6cb0;
      font-size: 1.25rem;
    }
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 15px;
    }
    .form-group {
      display: flex;
      flex-direction: column;
    }
    .form-group label {
      font-size: 0.88rem;
      font-weight: 600;
      margin-bottom: 6px;
      color: #4a5568;
    }
    .form-control {
      padding: 8px 12px;
      border: 1px solid #cbd5e0;
      border-radius: 6px;
      font-size: 0.95rem;
      outline: none;
    }
    .form-control:focus {
      border-color: #3182ce;
    }
    .form-actions {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .validation-hint {
      font-size: 0.85rem;
      color: #e53e3e;
    }
    .btn {
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: background-color 0.2s;
    }
    .btn-primary {
      background-color: #3182ce;
      color: #ffffff;
    }
    .btn-primary:disabled {
      background-color: #a0aec0;
      cursor: not-allowed;
      opacity: 0.65;
    }
    .btn-danger {
      background-color: #e53e3e;
      color: #ffffff;
      padding: 6px 12px;
      font-size: 0.85rem;
    }
    .stats-section {
      margin-bottom: 15px;
      display: flex;
      justify-content: flex-end;
    }
    .counter-badge {
      background: #edf2f7;
      padding: 6px 14px;
      border-radius: 15px;
      font-size: 0.95rem;
    }
    .counter-badge strong {
      color: #2b6cb0;
    }
    .movies-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
    }
    .movie-card {
      background: #ffffff;
      border-radius: 10px;
      padding: 16px;
      border: 2px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.2s;
    }
    .movie-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 10px;
    }
    .movie-title {
      margin: 0;
      font-size: 1.15rem;
      color: #1a202c;
    }
    .badge-recommended {
      background: #2f855a;
      color: #ffffff;
      padding: 3px 6px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: bold;
      white-space: nowrap;
    }
    .movie-body {
      margin-bottom: 12px;
    }
    .movie-year, .movie-rating {
      margin: 4px 0;
      font-size: 0.92rem;
    }
    .label {
      font-weight: 600;
      color: #718096;
    }
    .rating-value {
      font-weight: bold;
      padding: 2px 6px;
      border-radius: 4px;
    }
    /* 10. Динамічні кольори для ngClass */
    .rating-high {
      border-color: #38a169 !important;
    }
    .rating-value.rating-high {
      color: #22543d;
      background-color: #c6f6d5;
    }
    .rating-medium {
      border-color: #d69e2e !important;
    }
    .rating-value.rating-medium {
      color: #744210;
      background-color: #fefcbf;
    }
    .rating-low {
      border-color: #e53e3e !important;
    }
    .rating-value.rating-low {
      color: #742a2a;
      background-color: #fed7d7;
    }
    .movie-footer {
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid #edf2f7;
      padding-top: 10px;
    }
    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 30px;
      color: #a0aec0;
    }
  `,
  ],
})
export class AppComponent {
  // 1. Початковий масив мінімум із 3 об'єктів
  movies: Movie[] = [
    { title: 'Interstellar', year: 2014, rating: 9 },
    { title: 'Avatar', year: 2009, rating: 8 },
    { title: 'Titanic', year: 1997, rating: 7 },
  ];

  // Поля форми для [(ngModel)]
  newMovie = {
    title: '',
    year: null as number | null,
    rating: null as number | null,
  };

  // 11. Property Binding [disabled]: кнопка неактивна, якщо немає назви або некоректні дані
  get isFormValid(): boolean {
    return (
      this.newMovie.title.trim().length > 0 &&
      this.newMovie.year !== null &&
      this.newMovie.rating !== null &&
      this.newMovie.rating >= 1 &&
      this.newMovie.rating <= 10
    );
  }

  // 6. Метод додавання фільму через (click)
  addMovie(): void {
    if (!this.isFormValid) {
      return;
    }

    this.movies.push({
      title: this.newMovie.title.trim(),
      year: Number(this.newMovie.year),
      rating: Number(this.newMovie.rating),
    });

    // 8. Очищення форми після додавання
    this.newMovie = {
      title: '',
      year: null,
      rating: null,
    };
  }

  // 12. Метод видалення фільму за індексом через (click)
  deleteMovie(index: number): void {
    this.movies.splice(index, 1);
  }

  // 10. Динамічне оформлення ngClass
  getRatingClass(rating: number): string {
    if (rating >= 8) {
      return 'rating-high';
    } else if (rating >= 5) {
      return 'rating-medium';
    } else {
      return 'rating-low';
    }
  }
}
