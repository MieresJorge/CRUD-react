import react from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { table, button, container, modal, modalbody, modalheader, FormGroup, ModalFooter, Container, Button, Table, Modal, ModalHeader, ModalBody } from 'reactstrap';

//CONSTANTE CON ALGUNOS NOMBRES DE PRUEBA PARA EL FORMULARIO
const data = [
  { id: 1, personaje: "Ramus", rol: "Tanque" },
  { id: 2, personaje: "Azir", rol: "Mago" },
  { id: 3, personaje: "Trundle", rol: "Luchador" },
];

class App extends react.Component {
  state = {
    data: data,
    form: {
      id: '',
      personaje: '',
      rol: ''
    },
    modalInsertar: false,
  };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }

  //Funcion para ocultar y mostrar MODAL para AGREGAR nuevo dato
  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true });
  }
  ocultarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  }
  //Funcion para ocultar y mostrar MODAL para EDITARLO
  mostrarModalEditar = (registro) => {
    this.setState({ modalEditar: true , form: registro });
  }
  //Funcion para editar los datos
  editar = (dato) =>{
    var contador = 0;
    var lista=this.state.data;
    lista.map((registro)=>{
      if(dato.id==registro.id) {
        lista[contador].personaje=dato.personaje;
        lista[contador].rol=dato.rol;
      }
      contador++;
    });
    this.setState({data:lista, modalEditar: false });
  }
  ocultarModalEditar = () => {
    this.setState({ modalEditar: false });
  }
  //Funcion para insertar nuevos datos a la tabla y que se cierre al ingresarlo
  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var Lista = this.state.data;
    Lista.push(valorNuevo);
    this.setState({ data: Lista, modalInsertar: false });
  }

  //FUNCION para ELIMINAR
  eliminar=(dato)=> {
    var opcion =window.confirm("Realmente quiere eliminar el registro? "+ dato.id);
    if (opcion){
      var contador = 0 ;
      var Lista = this.state.data;
      Lista.map((registro) =>{
        if (registro.id==dato.id){
          Lista.splice(contador, 1 );
        }
        contador++;
      });
      this.setState({data:Lista});
    }
  }

  //FRONT END 
  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Insertar Nuevo personaje</Button>
          <br /><br />
          <Table>
            <thead>
              <tr><th>ID</th>
                <th>Personaje</th>
                <th>Rol</th>
                <th>Acciones</th></tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.personaje}</td>
                  <td>{elemento.rol}</td>
                  <td> <Button color="primary" onClick={() => this.mostrarModalEditar(elemento)} >editar</Button>{"  "}
                    <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button> </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>id:</label>
              <input className="form-control" readOnly type="text" value={this.state.data.length + 1} />
            </FormGroup>
            <FormGroup>
              <label >personaje: </label>
              <input className="form-control" name="personaje" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label >rol: </label>
              <input className="form-control" name="rol" type="text" onChange={this.handleChange} />
            </FormGroup>
            <ModalFooter>
              <Button color="primary" onClick={() => this.insertar()}>Insertar</Button>
              <Button color="danger" onClick={() => this.ocultarModalInsertar()}>Cancelar</Button>
            </ModalFooter>
          </ModalBody>
        </Modal>

                                    {/*CON ESTE MODAL EDITAMOS EL REGISTRO*/}
        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>id:</label>
              <input className="form-control" readOnly value = {this.state.form.id} />
            </FormGroup>
            <FormGroup>
              <label >personaje: </label>
              <input className="form-control" name="personaje" type="text" onChange={this.handleChange} value={this.state.form.personaje} />
            </FormGroup>

            <FormGroup>
              <label >rol: </label>
              <input className="form-control" name="rol" type="text" onChange={this.handleChange} value={this.state.form.rol} />
            </FormGroup>
            <ModalFooter>
              <Button color="primary" onClick={() => this.editar(this.state.form)}>Editar</Button>
              <Button color="danger" onClick={() => this.ocultarModalEditar()}>Cancelar</Button>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default App;
