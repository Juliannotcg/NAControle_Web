import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default class CadastroGrupo extends Component() {
  constructor(props) {
    super(props);

    this.state = {
      
    }
}
  render() {

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Cadastro de grupo
          </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="Nome do grupo"
              label="Nome do grupo"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="dataFundacao"
              name="dataFundacao"
              type="date"
              label="Data de abertura"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="cep"
              name="cep"
              label="CEP"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="endereco"
              name="endereco"
              label="Endereço completo"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="cidade"
              name="cidade"
              label="Cidade"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="state" name="estado" label="Estado" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="latitude"
              name="latitude"
              label="Latitude"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="longitude"
              name="longitude"
              label="Longitude"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="O grupo está ativo."
            />
          </Grid>
        </Grid>
        <Button color="primary" className={classes.button}>
          Salvar
      </Button>
      </React.Fragment>)
  }
}