# api-infojobs-hackathon

## Link para consumir informacion de mi perfil 

URL: [https://api-infojobs.hop.sh/filtradoSkill](https://api-infojobs.hop.sh/filtradoSkill)

![image](https://github.com/Jucamhc/api-infojobs-hackathon/assets/54044345/8aeb6e81-00ec-4633-bdc2-92a494224483)


## Link para consumir los empleos 

URL: [https://api-infojobs.hop.sh/api-offers/search](https://api-infojobs.hop.sh/api-offers/search)

Esta API REST es creada con Express que te brinda acceso a información laboral completa y adaptada a tus necesidades. Gracias a esta API, puedes filtrar las ofertas laborales según provincia, ciudad, opción de teletrabajo, categoría de trabajo, nivel educativo requerido, jornada laboral, tipo de contrato y país. Los filtros flexibles te permiten encontrar exactamente lo que buscas.

Nuestra API te ofrece acceso directo a todas las ofertas laborales actuales publicadas en Infojobs. Con total libertad y sin restricciones, podrás aprovechar al máximo todas las oportunidades disponibles. Prepárate para descubrir tu próximo desafío profesional sin barreras

Para crear tu consulta personalizada, puedes seguir estos pasos:

Comienza con el signo de interrogación "?".

  1. Añade cada uno de los filtros utilizando su código correspondiente.
  2. Si deseas obtener más información sobre el tema, te invito a visitar https://frond-infojobs.vercel.app/urlApi. Aquí podrás encontrar ejemplos y documentación detallada para construir tus consultas.
  3. Ten en cuenta que debes reemplazar "https://frond-infojobs.vercel.app/urlApi" con la URL correcta de la API que deseas utilizar.

¡No dudes en explorar y experimentar con diferentes combinaciones de filtros para obtener los resultados deseados!

?
keyword=${keyword}
&normalizedJobTitleIds=${normalizedJobTitleIds}
&provinceIds=${provinceIds}
&cityIds=${cityIds}
&teleworkingIds=${teleworkingIds}
&categoryIds=${categoryIds}
&workdayIds=${workdayIds}
&educationIds=${educationIds}
&segmentId=${segmentId}
&contractTypeIds=${contractTypeIds}
&page=${page}
&sortBy=${sortBy}
&onlyForeignCountry=${onlyForeignCountry}
&countryIds=${countryIds}
&sinceDate=${sinceDate}
&subcategoryIds=${subcategoryIds}

### Ejemplo 

![image](https://github.com/Jucamhc/api-infojobs-hackathon/assets/54044345/7f5115d0-41ab-4e17-b9fd-aef355f9fd3e)

