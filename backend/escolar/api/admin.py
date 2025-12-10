from django.contrib import admin
from .models import Aluno


@admin.register(Aluno)
class AlunoAdmin(admin.ModelAdmin):
    """Admin interface para o modelo Aluno"""
    
    list_display = ('nome', 'escola', 'turno', 'tipo', 'forma_pagamento', 'ativo', 'criado_em')
    list_filter = ('turno', 'tipo', 'forma_pagamento', 'escola', 'ativo', 'criado_em')
    search_fields = ('nome', 'responsavel_nome', 'escola', 'endereco')
    readonly_fields = ('criado_em', 'atualizado_em')
    
    fieldsets = (
        ('Informações Pessoais', {
            'fields': ('nome', 'responsavel_nome', 'endereco', 'escola')
        }),
        ('Informações de Transporte', {
            'fields': ('turno', 'tipo', 'forma_pagamento')
        }),
        ('Status', {
            'fields': ('ativo',)
        }),
        ('Datas', {
            'fields': ('criado_em', 'atualizado_em'),
            'classes': ('collapse',)
        }),
    )
    
    ordering = ('-criado_em',)
