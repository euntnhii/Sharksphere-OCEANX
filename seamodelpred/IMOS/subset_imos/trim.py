"""
Trim the first 71 metadata rows from the IMOS complete CSV file.
"""

from pathlib import Path

# Path to the complete dataset
input_file = Path('C:\\Users\\thefa\\Downloads\\Phone Link\\gitadd\\IMOS\\IMOS_-_National_Reef_Monitoring_Network_Sub-Facility_-_Global_reef_fish_abundance_and_biomass_complete.csv')
output_file = input_file.with_stem(input_file.stem + '_trimmed')

print(f"Input file: {input_file}")
print(f"Output file: {output_file}")

if not input_file.exists():
    raise FileNotFoundError(f"{input_file} not found")

# Read all lines and skip the first 71 rows
with open(input_file, 'r', encoding='utf-8') as f:
    all_lines = f.readlines()

skipped = all_lines[:71]
kept = all_lines[71:]

print(f"Total lines: {len(all_lines)}")
print(f"Skipped (metadata): {len(skipped)}")
print(f"Kept (data): {len(kept)}")

# Write trimmed file
with open(output_file, 'w', encoding='utf-8') as f:
    f.writelines(kept)

print(f"✓ Trimmed file saved to {output_file}")
