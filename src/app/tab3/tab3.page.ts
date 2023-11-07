import { Component, ViewChild } from '@angular/core';
import { ImgService } from '../img.service';
import { DatosUsuarioServiceService } from '../datos-usuario-service.service';
import { AuthService } from '../auth.service';
import { Storage } from '@ionic/storage-angular';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild('fileInput') fileInput: any;
  
  constructor(private imagenPerfilService: ImgService, private apiService: ApiServiceService, private datosUsuarioService: DatosUsuarioServiceService, private storage: Storage, private storageService: AuthService) {}
  
  selectFile() {
    this.fileInput.nativeElement.click();
  }
  
  cargarNuevaImagen(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const archivos = inputElement.files;
  
    if (archivos && archivos.length > 0) {
      const archivoSeleccionado = archivos[0];
      const urlImagen = URL.createObjectURL(archivoSeleccionado);
  
      // Establecer la nueva imagen de perfil en el servicio compartido
      this.imagenPerfilService.setImagenPerfil(urlImagen);
    }
  } 
  
  getImagenPerfil(): string {
    return this.imagenPerfilService.getImagenPerfil();
  }

    onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log('Archivo seleccionado:', selectedFile);
    }
  }

  async conseguirPerfil(){
    let id = await this.storage.get('user_id');
  }
  conductor: any;

  async ngOnInit() {
    // Accede a las propiedades del servicio y asígnalas a las variables locales
    this.storage.get('user_id').then(
      async (userId: number | null) => {
        if (userId !== null) {
          // Hacer la solicitud a la API utilizando el user_id obtenido del almacenamiento
          this.apiService.getConductorById(userId).subscribe(
            async (data: any) => {
              this.conductor = data;
              console.log(data);
  
              // Verifica que la propiedad 'usuario' esté definida antes de acceder a ella
              if (this.conductor && this.conductor.usuario) {
                // Aquí puedes acceder a las propiedades del usuario sin generar un error
                const userEmail = this.conductor.usuario.email;
                console.log('Email del usuario:', userEmail);
              }
            },
            (error: any) => {
              // Maneja los errores aquí
              console.error(error);
            }
          );
        } else {
          console.error('No se pudo obtener el user_id del almacenamiento local.');
        }
      },
      (storageError: any) => {
        console.error('Error al obtener el user_id del almacenamiento local:', storageError);
      }
    );
  }
}
