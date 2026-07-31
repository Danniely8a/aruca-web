# -*- coding: utf-8 -*-
import re

fpath = r'src\lib\data\products.ts'
content = open(fpath, 'r', encoding='utf-8').read()

replacements = {
    '\u00c3\u00a1': '\u00e1',  # a con acento
    '\u00c3\u00a9': '\u00e9',  # e con acento
    '\u00c3\u00ad': '\u00ed',  # i con acento
    '\u00c3\u00b3': '\u00f3',  # o con acento
    '\u00c3\u00ba': '\u00fa',  # u con acento
    '\u00c3\u00b1': '\u00f1',  # n con tilde
    '\u00c3\u00bc': '\u00fc',  # u con dieresis
    '\u00c3\u0081': '\u00c1',  # A mayuscula con acento
    '\u00c3\u0089': '\u00c9',  # E mayuscula con acento
    '\u00c3\u008d': '\u00cd',  # I mayuscula con acento
    '\u00c3\u0093': '\u00d3',  # O mayuscula con acento
    '\u00c3\u009a': '\u00da',  # U mayuscula con acento
    '\u00c3\u0091': '\u00d1',  # N mayuscula con tilde
    '\u00c2\u00b0': '\u00b0',  # simbolo de grado
    '\u00c2\u00ba': '\u00ba',  # ordinal
    '\u00c2\u00bf': '\u00bf',  # interrogacion invertida
    '\u00c2\u00a1': '\u00a1',  # exclamacion invertida
    '\u00c2\u00ab': '\u00ab',  # comilla izquierda
    '\u00c2\u00bb': '\u00bb',  # comilla derecha
    '\u00e2\u0080\u009c': '\u201c',  # comilla doble izquierda
    '\u00e2\u0080\u009d': '\u201d',  # comilla doble derecha
    '\u00e2\u0080\u0098': '\u2018',  # comilla simple izquierda
    '\u00e2\u0080\u0099': '\u2019',  # comilla simple derecha
    '\u00e2\u0080\u00b3': '\u2033',  # doble prima (pulgadas)
    '\u00e2\u0080\u00b2': '\u2032',  # prima
    '\u00e2\u0080\u00a2': '-',        # bullet
    '\u00c2\u00ad': '',                # soft hyphen
    '\u00c2\u00ae': '(R)',             # registered
    '\u00c2\u00a9': '(C)',             # copyright
    '\u00e2\u0084\u00a2': '(TM)',      # trademark
}

count = 0
for wrong, correct in replacements.items():
    found = content.count(wrong)
    if found:
        content = content.replace(wrong, correct)
        count += found
        print(f'  Replaced {found} occurrences of {repr(wrong)} -> {repr(correct)}')

open(fpath, 'w', encoding='utf-8').write(content)
print(f'\nTotal: {count} corrections')
