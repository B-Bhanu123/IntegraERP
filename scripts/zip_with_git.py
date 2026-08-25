import os
import zipfile

source_dir = r"c:\Users\91807\OneDrive\Desktop\task"
zip_output = r"c:\Users\91807\OneDrive\Desktop\task\task.zip"
desktop_output = r"c:\Users\91807\OneDrive\Desktop\task.zip"

print("Creating ZIP file including .git directory...")

with zipfile.ZipFile(zip_output, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(source_dir):
        # Exclude node_modules, dist, and existing zip files
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if 'dist' in dirs:
            dirs.remove('dist')
        
        for file in files:
            if file.endswith('.zip') or file.endswith('.tmp'):
                continue
            
            full_path = os.path.join(root, file)
            arcname = os.path.relpath(full_path, source_dir)
            zipf.write(full_path, arcname)

print("Copying zip to Desktop...")
with open(zip_output, 'rb') as f_in:
    with open(desktop_output, 'wb') as f_out:
        f_out.write(f_in.read())

print("ZIP creation completed successfully!")
