from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Aluno

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Serializer para o modelo User"""
    password = serializers.CharField(write_only=True, min_length=6)
    
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password']
        read_only_fields = ['id']
    
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user


class LoginSerializer(serializers.Serializer):
    """Serializer para login"""
    email = serializers.EmailField()
    password = serializers.CharField()


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
