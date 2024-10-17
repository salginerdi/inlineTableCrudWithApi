import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {Message} from 'primeng/api';

export interface Department {
  "departmentId": number,
  "departmentName": string,
  "departmentLogo": string,
  "isEdit": boolean,
}

@Component({
  selector: 'app-inline-with-api',
  standalone: true,
  imports: [
    TableModule,
    FormsModule,
    InputTextModule,
    Button,
    MessagesModule,
  ],
  templateUrl: './inline-with-api.component.html',
  styleUrl: './inline-with-api.component.scss'
})
export class InlineWithApiComponent implements OnInit {
  http = inject(HttpClient)
  departmentList: Department[] = [];
  currentEditableObj: Department | undefined
  messages = signal<Message[]>([]);

  ngOnInit(): void {
    this.getAllDepartments()
  }

  getAllDepartments() {
    this.http.get('https://projectapi.gerasim.in/api/Complaint/GetParentDepartment').subscribe((res: any) => {
      this.departmentList = res.data
    })
  }

  onEdit(department: Department) {
    department.isEdit = true
    const strObj = JSON.stringify(department)
    const newObj = JSON.parse(strObj);
    this.currentEditableObj = newObj
  }

  onCancel(department: Department) {
    department.isEdit = false;
    department.departmentName = <string>this.currentEditableObj?.departmentName;
    department.departmentLogo = <string>this.currentEditableObj?.departmentLogo
    department.departmentId = <number>this.currentEditableObj?.departmentId
  }

  onUpdate(department: Department) {
    this.http.post('https://projectapi.gerasim.in/api/Complaint/UpdateDepartment', department).subscribe((res: any) => {
      if (res.result) {
        this.messages.update(current => [...current, {
          severity: 'success', detail: 'Department updated successfully'
        }])
        this.getAllDepartments()
      } else {
        this.messages.update(current => [...current, {
          severity: 'error', detail: 'Department not updated'
        }])
      }
    })
  }

  addNew() {
    this.departmentList.unshift({departmentId: 0, departmentLogo: '', departmentName: '', isEdit: true})
  }

  onNewCreate(department: Department){
    this.http.post('https://projectapi.gerasim.in/api/Complaint/AddNewDepartment', department).subscribe((res: any) => {
      if (res.result) {
        this.messages.update(current => [...current, {
          severity: 'success', detail: 'Department created successfully'
        }])
        this.getAllDepartments()
      } else {
        this.messages.update(current => [...current, {
          severity: 'error', detail: 'Department not created'
        }])
      }
    })
  }

}
