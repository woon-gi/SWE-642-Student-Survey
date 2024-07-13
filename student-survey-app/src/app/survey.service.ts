import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from './survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  //Base URL for the REST API Endpoints
  private baseUrl = 'http://localhost:8080/api/surveys';

  constructor(private http: HttpClient) { }

  /* GET /api/surveys: Retrieve all surveys.
  Method to retrieve all surveys from the backend */
  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(`${this.baseUrl}`);
  }

  /* POST /api/surveys: Create a new survey.
  Method to create a new survey and send it to the backend */
  createSurvey(survey: Survey): Observable<Survey> {
    return this.http.post<Survey>(this.baseUrl, survey);
  }

  /* PUT /api/surveys/{id}: Update an existing survey.
  Method to update an existing survey by its ID */
  updateSurvey(id: number, survey: Survey): Observable<Survey> {
    return this.http.put<Survey>(`${this.baseUrl}/${id}`, survey);
  }

  /* DELETE /api/surveys/{id}: Delete a survey.
  Method to delete a survey by its ID */
  deleteSurvey(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}