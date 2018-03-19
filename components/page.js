import React from 'react'
import Layout from '../components/layout'

export default class extends React.Component {

  static async getInitialProps({ req }) {
    return {
      lang: 'en'// Add a lang property for accessibility
    }
  }
}
