import Link from 'next/link'
import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'

export default class extends Page {
  render() {
    return (
      <Layout {...this.props} navmenu={false} container={false}>
        <h1>Hello World</h1>
      </Layout>
    )
  }
}