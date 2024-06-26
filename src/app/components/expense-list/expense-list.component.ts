import { NgIfContext } from '@angular/common';
import { ExpenseService } from './../../services/expense.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Expense } from 'src/app/models/expense.model';
import * as Toastify from 'toastify-js';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  total: number = 0;

  constructor(
    private ExpenseService: ExpenseService
  ){}

  ngOnInit(): void {
      this.loadDataIntoTable();
  }

  deleteExpense(id: number): void {
    this.ExpenseService.deleteExpense(id).subscribe(response => {
      this.showSuccessToast("Gasto excluido com sucesso!")
      this.expenses = this.expenses.filter(expense => expense.id != id);
      this.calculateTotal();
    })
  }

  private loadDataIntoTable(): void {
    this.ExpenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
      this.calculateTotal();
    });
  }

  private calculateTotal(): void {
    this.total = this.expenses.reduce((accumulated, currentValue) => {
      return accumulated + Number(currentValue.amount);
    }, 0);
  }

  private showSuccessToast(message: string): void {
    Toastify({
      text: message,
      close: true,
      gravity: "bottom",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "#189586",
      }
    }).showToast();
  }
}
