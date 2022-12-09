import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';

//primeng services
import { MessageService } from 'primeng/api';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl: string = 'http://129.146.118.224:9001/';
  // private apiUrl: string = 'https://localhost:7017/';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private message: MessageService,
    private cookies: CookieService,
    private router: Router
  ) {}

  public async post(method: string, payload: any = {}): Promise<any> {
    // if(!this.auth.validateToken()) this.router.navigate(['/unauthorized']);
    return new Promise<any>((resolve, reject) => {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      //   headers.append("Authorization",`Bearer ${this.auth.token}`);
      this.http
        .post(`${this.apiUrl}${method}`, payload, { headers })
        .pipe(take(1))
        .subscribe(
          (res) => {
            resolve(res); //PENDIENTE
          },
          (error) => {
            this.message.add({
              severity: 'error',
              summary: 'Error al consultar',
              detail: error.message,
              life: 5000,
            });
            reject(error); //PENDIENTE
          }
        );
    });
  }

  public async get(method: string): Promise<any> {
    // if(!this.auth.validateToken()) this.router.navigate(['/unauthorized']);
    console.log(`${this.apiUrl}${method}`);
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(`${this.apiUrl}${method}`)
        .pipe(take(1))
        .subscribe(
          (res) => {
            resolve(res); //PENDIENTE
          },
          (error) => {
            this.message.add({
              severity: 'error',
              summary: 'Error al consultar',
              detail: error.message,
              life: 5000,
            });
            reject(error); //PENDIENTE
          }
        );
    });
  }

  public async put(method: string, payload: any = {}): Promise<any> {
    // if(!this.auth.validateToken()) this.router.navigate(['/unauthorized']);
    return new Promise<any>((resolve, reject) => {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      //   headers.append("Authorization",`Bearer ${this.auth.token}`);
      this.http
        .put(`${this.apiUrl}${method}`, payload, { headers })
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            this.message.add({
              severity: res.error,
              summary: res.summary,
              detail: res.message,
              life: 5000,
            });
            resolve(res); //PENDIENTE
          },
          (error) => {
            this.message.add({
              severity: 'error',
              summary: 'Error al consultar',
              detail: error.message,
              life: 5000,
            });
            reject(error); //PENDIENTE
          }
        );
    });
  }

  public async login(NumEmpleado: string, password: string): Promise<boolean> {
    let res = await this.post('Usuarios/loginWeb', { NumEmpleado, password });
    console.log('res');
    console.log(res);
    console.log(res.error);
    if (res && !res.error) {
      this.auth.token = res.token;
      this.auth.setToken(res.token);

      this.router.navigateByUrl('menu');
      this.message.add({
        severity: 'success',
        summary: 'Bienvenido!',
        detail: res.message,
        life: 5000,
      });
      return true;
    } else {
      console.log(res.message);
      this.message.add({
        severity: 'error',
        summary: 'Fallo al iniciar sesión =(',
        detail: res.message,
        life: 5000,
      });
      return false;
    }
  }
}
