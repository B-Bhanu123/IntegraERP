import os
import zipfile
import subprocess

zip_path = r"c:\Users\91807\OneDrive\Desktop\task\task.zip"

print("--- TrainPlex Compliance Verification Audit ---")

with zipfile.ZipFile(zip_path, 'r') as z:
    file_list = z.namelist()
    
    # 1. Minimum 50k LOC
    ts_files = [f for f in file_list if f.endswith('.ts') or f.endswith('.js') or f.endswith('.css')]
    total_loc = 0
    for fname in ts_files:
        try:
            content = z.read(fname).decode('utf-8', errors='ignore')
            total_loc += len(content.splitlines())
        except Exception:
            pass
            
    print(f"1. LOC Check: {total_loc} lines (Required: 50,000+) -> {'PASS' if total_loc >= 50000 else 'FAIL'}")

    # 2. Git-based repository (.git directory check)
    git_dir_exists = any(f.startswith('.git/') for f in file_list)
    print(f"2. Git Repo Check (.git folder): {'PASS' if git_dir_exists else 'FAIL'}")

    # 3. Executable Project Check (Dockerfile / start script)
    has_docker = 'Dockerfile' in file_list
    has_pkg = 'package.json' in file_list
    print(f"3. Executable Check (Dockerfile & package.json): {'PASS' if (has_docker and has_pkg) else 'FAIL'}")

# 4. Local Git Commits & PR Merges Check
cmd_commits = ["git", "rev-list", "--count", "HEAD"]
commits_count = int(subprocess.check_output(cmd_commits, cwd=r"c:\Users\91807\OneDrive\Desktop\task").decode().strip())
print(f"4. Meaningful Commits: {commits_count} commits (Required: >= 5) -> {'PASS' if commits_count >= 5 else 'FAIL'}")

cmd_merges = ["git", "log", "--merges", "--oneline"]
merges_output = subprocess.check_output(cmd_merges, cwd=r"c:\Users\91807\OneDrive\Desktop\task").decode().strip()
merges_count = len(merges_output.splitlines()) if merges_output else 0
print(f"5. PR Merges (git merge --no-ff): {merges_count} PR merges (Required: >= 4) -> {'PASS' if merges_count >= 4 else 'FAIL'}")

print("--- Audit Completed ---")
