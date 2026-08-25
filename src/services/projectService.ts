import { Project } from '../core/models/project';
import { EntityStatus, UUID } from '../core/models/types';

export class ProjectService {
  private projects: Map<UUID, Project> = new Map();

  constructor(initialProjects: Project[] = []) {
    initialProjects.forEach((p) => this.projects.set(p.id, p));
  }

  public getAllProjects(): Project[] {
    return Array.from(this.projects.values());
  }

  public getProjectById(id: UUID): Project | undefined {
    return this.projects.get(id);
  }

  public createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
    const id = `proj_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const now = new Date().toISOString();

    const newProject: Project = {
      ...projectData,
      id,
      createdAt: now,
      updatedAt: now,
    };

    this.projects.set(id, newProject);
    return newProject;
  }

  public updateProjectStatus(id: UUID, status: EntityStatus): Project {
    const project = this.getProjectById(id);
    if (!project) {
      throw new Error(`Project with ID ${id} not found.`);
    }

    const updated = {
      ...project,
      status,
      updatedAt: new Date().toISOString(),
    };

    this.projects.set(id, updated);
    return updated;
  }
}
