import React from 'react';
import DeckGL from '@deck.gl/react';
import {LineLayer, PolygonLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';


const INITIAL_VIEW_STATE = {
    longitude: 0,
    latitude: 51,
    zoom: 13,
    pitch: 0,
    bearing: 0
  };

export default class App extends React.Component<{}, {}> {
    state = {
        text: "",
        polygons: [{ contour: [[0, 51], [0.01, 51], [0, 51.01]] }],
        newPolygonIndex: -1,
    }

    async componentDidMount() {
        const polygons = [];
        for(let i = 1; i < 150000; i++) {
            polygons.push({ contour: [[i, 51], [(i / 10) + 0.01, 51], [i, 51.01]] })
        }
        this.setState({ polygons });
    }

    render() {
        console.log("POLYGONS: ", this.state.polygons);
        const layer = new PolygonLayer({
            id: 'polygon-layer',
            data: this.state.polygons,
            pickable: true,
            stroked: true,
            filled: true,
            wireframe: true,
            lineWidthMinPixels: 1,
            getPolygon: d => d.contour,
            getElevation: d => d.population / d.area / 10,
            getFillColor: d => [d.population / d.area / 60, 140, 0],
            getLineColor: [80, 80, 80],
            getLineWidth: 1
          });

        return (
            <main>
                <div className="container-fluid">
                    <button onClick={() => this.setState({ newPolygonIndex: this.state.newPolygonIndex - 1, polygons: [...this.state.polygons, { contour: [[this.state.newPolygonIndex, 51], [(this.state.newPolygonIndex / 10) + 0.01, 51], [this.state.newPolygonIndex, 51.01]] }] })} className="btn btn-primary">Add Polygon</button>
                    <div className="container">
                       <h1>Hello World!</h1>
                       <input className="form-control" value={this.state.text} onChange={(e) => this.setState({ text: e.currentTarget.value })}></input>
                    </div>
                    <div style={{ width: 200, height: 200 }}>
                    <DeckGL style={{ top: "200px" }}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={[layer]}> 
      <StaticMap style={{ top: 100, zIndex: -2 }} width={200} height={200} mapboxApiAccessToken={"pk.eyJ1Ijoibmlja3NwaWNlciIsImEiOiJja3ZtaThjdXgweWpoMndrbHo0YjJ2a3hrIn0.LSzgg-K-zPAuJu9iQPghbA"} />
      </DeckGL>
                    </div>
                    
                </div>
            </main>
        )
    }
}





