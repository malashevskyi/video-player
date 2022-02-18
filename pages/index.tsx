import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Manager from '../components/Manager'
import * as os from 'os'
import { IndexProps } from '../types'

import path from 'path'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { managerActions } from '../store'
import dynamic from 'next/dynamic'

const VideoPopupWithNoSSR = dynamic(() => import('../components/Modal'), {
  ssr: false,
})

const Index: NextPage<IndexProps> = ({ separator, startDirectory }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(managerActions.setStartDirectory(startDirectory))
  }, [startDirectory])

  return (
    <div>
      <Head>
        <title>Video Player</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VideoPopupWithNoSSR />

      <Manager separator={separator} startDirectory={startDirectory} />
    </div>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return {
    props: {
      separator: os.type() === ('Darwin' || 'Linux') ? '/' : '\\',
      startDirectory: path.join(process.cwd(), 'public', 'file-manager'),
    },
  }
}
