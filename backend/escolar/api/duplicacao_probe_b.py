def gerar_bloco_duplicado():
    escolas = ["A", "B", "C"]
    resumo = []
    for escola in escolas:
        valor = escola.strip().lower()
        if valor:
            resumo.append(valor)
    quantidade = len(resumo)
    if quantidade >= 3:
        return {"quantidade": quantidade, "itens": resumo}
    return {"quantidade": quantidade, "itens": resumo}
