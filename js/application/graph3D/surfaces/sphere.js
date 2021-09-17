Surface.prototype.sphere = (color = '#00FFFF', x = 0, y = 0, z = 0, R = 10, vertPoints = 14, horizPoints =14) => {
    angleVert = Math.PI / vertPoints;
    angleHoriz = 2 * Math.PI / horizPoints;
    let points = [];
    let edges = [];
    let polygones = [];
    //точки
    for (let i = 0; i < vertPoints; i++) {
        for (let j = 0; j < horizPoints; j++) {
            points.push(
                new Point(
                    x + R * Math.sin(angleVert * i) * Math.cos(angleHoriz * j),
                    y + R * Math.sin(angleVert * i) * Math.sin(angleHoriz * j),
                    z + R * Math.cos(angleVert * i)
                )
            );
        }
    }
    //рёбра
    let current = horizPoints;
    for (let i = horizPoints; i < vertPoints * horizPoints; i++) {
        if (i % horizPoints != horizPoints - 1) {
            edges.push(new Edge(i, i + 1));
        } else {
            edges.push(new Edge(i, current));
            current += horizPoints;
        }
    }
    for (let i = 0; i < vertPoints * horizPoints - horizPoints; i++) {
        edges.push(new Edge(i, i + horizPoints));
    }
    //полигоны
    let polCurrent = 0;
    for (let i = 0; i < vertPoints * horizPoints - horizPoints; i++) {
        if (i % horizPoints != horizPoints - 1) {
            polygones.push(new Polygon([i, i + 1,i + horizPoints + 1 , i + horizPoints], color));
        } else {
            polygones.push(new Polygon([i, polCurrent,i + 1 , i + horizPoints], color));
            polCurrent += horizPoints;
        }
    }
    let dotes = [];
    for(let i = 1; i <= horizPoints; i++){
        dotes.push(vertPoints * horizPoints - i);
    }
    polygones.push(new Polygon(dotes, color));
    //окно
    if(vertPoints*horizPoints%2==0){
    polygones.forEach( (element,i) => {
        if (i == (vertPoints*horizPoints/2)) {
            polygones.splice(i,2);
        }

        if (i == (vertPoints*horizPoints/2-vertPoints+2)) {
            polygones.splice(i,2);
        }
    })
       }
    if(vertPoints*horizPoints%2==1){
    polygones.forEach( (element,i) => {
        if (i == ((vertPoints*horizPoints-1)/2)) {
            polygones.splice(i,2);
        }

        if (i == ((vertPoints*horizPoints-1)/2-vertPoints+2)) {
            polygones.splice(i,2);
        }
    })
       }

    

    return new Subject(points, edges, polygones);
}