const API = "http://192.168.1.100:3000/IniciarSesion";

export const post_iniciarSesion = async () => {
  const res = await fetch(API);
  return await res.json();
};
