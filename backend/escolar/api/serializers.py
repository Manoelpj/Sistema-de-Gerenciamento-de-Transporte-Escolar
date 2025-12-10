from rest_framework import serializers
from .models import Aluno


class AlunoSerializer(serializers.ModelSerializer):
    """Serializer para o modelo Aluno"""
    
    class Meta:
        model = Aluno
        fields = [
            'id',
            'nome',
            'responsavel_nome',
            'endereco',
            'turno',
            'tipo',
            'forma_pagamento',
            'escola',
            'ativo',
            'criado_em',
            'atualizado_em',
        ]
        read_only_fields = ['id', 'criado_em', 'atualizado_em']
        
    def validate_nome(self, value):
        """Valida que o nome não está vazio e tem comprimento mínimo"""
        if not value or len(value.strip()) < 3:
            raise serializers.ValidationError(
                "O nome deve ter pelo menos 3 caracteres."
            )
        return value
    
    def validate_endereco(self, value):
        """Valida que o endereço não está vazio"""
        if not value or len(value.strip()) < 5:
            raise serializers.ValidationError(
                "O endereço deve ter pelo menos 5 caracteres."
            )
        return value
    
    def validate_turno(self, value):
        """Valida que o turno é um dos valores permitidos"""
        valid_choices = ['matutino', 'vespertino', 'integral']
        if value not in valid_choices:
            raise serializers.ValidationError(
                f"Turno deve ser um de: {', '.join(valid_choices)}"
            )
        return value
    
    def validate_tipo(self, value):
        """Valida que o tipo é um dos valores permitidos"""
        valid_choices = ['ida', 'volta', 'ida e volta']
        if value not in valid_choices:
            raise serializers.ValidationError(
                f"Tipo deve ser um de: {', '.join(valid_choices)}"
            )
        return value
    
    def validate_forma_pagamento(self, value):
        """Valida que a forma de pagamento é uma dos valores permitidos"""
        valid_choices = ['pix', 'cartao', 'boleto', 'dinheiro']
        if value not in valid_choices:
            raise serializers.ValidationError(
                f"Forma de pagamento deve ser uma de: {', '.join(valid_choices)}"
            )
        return value
