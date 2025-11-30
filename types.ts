export enum K8sServiceType {
  ClusterIP = 'ClusterIP',
  NodePort = 'NodePort',
  LoadBalancer = 'LoadBalancer',
  ExternalName = 'ExternalName'
}

export interface SectionProps {
  id: string;
  className?: string;
}

export type DeploymentScale = {
  replicas: number;
  traffic: number;
};
