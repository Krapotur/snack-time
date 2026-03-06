declare var M;

export class MaterialService {
   toast(message: string) {
    M.toast({html: message})
  }
}
