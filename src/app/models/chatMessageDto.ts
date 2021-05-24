export interface ubicacion {
    LUGARES: Lugare[];
}
  
export interface Lugare {
    name:       string;
    icon:       string;
    redirectTo: string;
    acciones:   info[];
  }
  
export interface info {
    ID:     string;
    status: string;
}

