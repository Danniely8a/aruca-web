import os

filepath = os.path.join(os.path.dirname(__file__), '..', 'src', 'lib', 'data', 'products.ts')

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

total = len(lines)
print(f"Total lines before: {total}")

# Lines 7072-7126 (1-indexed) = indices 7071-7125
ct_lines = lines[7071:7126]
print(f"CT product lines to move: {len(ct_lines)}")

# Part 1: everything up to (but not including) products array closing ];
part1 = lines[:7011]

# Part 2: the CT products to insert
part2 = ct_lines

# Part 3: ]; closing products array
part3 = [lines[7011]]

# Part 4: productCategories (lines 7014-7037, indices 7013-7036)
part4 = lines[7013:7037]

# Part 5: productSubcategories with Cintas Templadas added
part5_raw = lines[7038:7070]
part5 = []
for line in part5_raw:
    part5.append(line)
    if '"Cintas Bimetalicas"' in line:
        part5.append('  "Cintas Templadas",\n')

new_file = part1 + part2 + part3 + part4 + part5

print(f"Total lines after: {len(new_file)}")

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(new_file)

print("Done!")
