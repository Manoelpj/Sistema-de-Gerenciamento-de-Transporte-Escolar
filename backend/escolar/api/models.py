from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """Modelo de usuário customizado para autenticação"""
    
    email = models.EmailField(unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'
    
    def __str__(self):
        return self.email


class Aluno(models.Model):
    """Modelo para representar um aluno no sistema"""
    
    # Choices para campos com opções pré-definidas
    TURNO_CHOICES = [
        ('matutino', 'Matutino'),
        ('vespertino', 'Vespertino'),
        ('integral', 'Integral'),
    ]
    
    TIPO_CHOICES = [
        ('ida', 'Ida'),
        ('volta', 'Volta'),
        ('ida e volta', 'Ida e Volta'),
    ]
    
    FORMA_PAGAMENTO_CHOICES = [
        ('pix', 'PIX'),
        ('cartao', 'Cartão'),
        ('boleto', 'Boleto'),
        ('dinheiro', 'Dinheiro'),
    ]
    
    # Campos obrigatórios
    nome = models.CharField(
        max_length=200, 
        help_text="Nome completo do aluno"
    )
    
    responsavel_nome = models.CharField(
        max_length=200,
        help_text="Nome do responsável pelo aluno"
    )
    
    endereco = models.TextField(
        help_text="Endereço residencial do aluno"
    )
    
    turno = models.CharField(
        max_length=20,
        choices=TURNO_CHOICES,
        help_text="Turno em que o aluno estuda"
    )
    
    tipo = models.CharField(
        max_length=20,
        choices=TIPO_CHOICES,
        help_text="Tipo de transporte: ida, volta ou ida e volta"
    )
    
    forma_pagamento = models.CharField(
        max_length=20,
        choices=FORMA_PAGAMENTO_CHOICES,
        help_text="Forma de pagamento do transporte escolar"
    )
    
    escola = models.CharField(
        max_length=200,
        help_text="Nome da escola que o aluno frequenta"
    )
    
    # Campos de controle
    criado_em = models.DateTimeField(
        auto_now_add=True,
        help_text="Data e hora de criação do registro"
    )
    
    atualizado_em = models.DateTimeField(
        auto_now=True,
        help_text="Data e hora da última atualização"
    )
    
    ativo = models.BooleanField(
        default=True,
        help_text="Indica se o aluno está ativo no sistema"
    )
    
    class Meta:
        ordering = ['-criado_em']
        verbose_name = 'Aluno'
        verbose_name_plural = 'Alunos'
        indexes = [
            models.Index(fields=['nome']),
            models.Index(fields=['escola']),
            models.Index(fields=['ativo']),
        ]
    
    def __str__(self):
        return f"{self.nome} - {self.escola}"
