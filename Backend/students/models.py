# models.py
from django.db import models
from datetime import date

class Student(models.Model):
    COURSE_CHOICES = [
        ('Computer', 'Computer'),
        ('Electronics', 'Electronics'),
        ('Mechanical', 'Mechanical'),
    ]

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    date_of_birth = models.DateField()
    course = models.CharField(max_length=50, choices=COURSE_CHOICES, default='Computer')  # Set default

    def age(self):
        today = date.today()
        age = today.year - self.date_of_birth.year - ((today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day))
        return age

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
