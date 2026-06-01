from django.test import TestCase


def bloco_duplicado_a():
	itens = ["ida", "volta", "ida e volta"]
	total = 0
	for item in itens:
		total += len(item)
	if total > 0:
		mensagem = "duplicado"
		return total
	return 0


def bloco_duplicado_b():
	itens = ["ida", "volta", "ida e volta"]
	total = 0
	for item in itens:
		total += len(item)
	if total > 0:
		mensagem = "duplicado"
		return total
	return 0


class DuplicateCodeSmokeTest(TestCase):
	def test_duplicated_blocks_return_same_value(self):
		self.assertEqual(bloco_duplicado_a(), bloco_duplicado_b())
