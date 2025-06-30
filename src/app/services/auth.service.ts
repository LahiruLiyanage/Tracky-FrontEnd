import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResponse, ChangePasswordRequest, ForgotPasswordRequest, LoginRequest, ResetPasswordRequest, SignupRequest } from "../models/user.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1/auth';

  constructor(private http: HttpClient) {}

  signup(data: SignupRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data);
  }

  refreshToken(refreshToken: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, { refreshToken });
  }

  changePassword(data: ChangePasswordRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/change-password`, data);
  }

  forgotPassword(data: ForgotPasswordRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, data);
  }

  resetPassword(data: ResetPasswordRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/reset-password`, data);
  }
}