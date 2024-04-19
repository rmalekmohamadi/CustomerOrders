"use client";

import { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import Link from 'next/link'
import { FaTrashAlt } from "react-icons/fa";
import { Spinner } from "../spinner";
import { API_BASE_URL } from "../../appconfig";
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import React, { forwardRef, useImperativeHandle } from "react";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());
// const fetcher = url => fetch(url, {method:"Delete"}).then(res => res.json())

interface DeleteModalProps {
  orderid: number,
  onDeleteOrder: (orderid: number) => void
}

const DeleteModal: React.FC<DeleteModalProps> = (props) => {
  const [openModal, setOpenModal] = useState(false)
  // const url = API_BASE_URL + "/orders/delete/" + orderid;
  // const { data, trigger } = useSWRMutation(url, fetcher);

  // useEffect(() => {
  //   if(data !=  null)
  //     {
  //       console.log("data : " + data)
  //         if(data.succeed)
  //         {
  //             toast.success('Order added successfully'); 
  //         }
  //         else{
  //             toast.success('Failed to add order'); 
  //         }
  //         setOpenModal(false)
  //         router.push("/orders")
  //       }
  //   }, [data])
  
  // function deleteOrder(){
  //   setIsLoading(true);
  //   trigger();
  // }
  
  function onDeleteOrderHandler(){
    setOpenModal(false);
    props.onDeleteOrder(props.orderid)
  }

  function onCloseHandler(){
    setOpenModal(false);
  }

  return (
    <>
      <Link href="" onClick={() => setOpenModal(true)} className='p-2 my-2 ml-0 mr-2 rounded text-red-500 bg-red-200 hover:text-red-700 hover:bg-red-300'><FaTrashAlt /></Link>
      <Modal show={openModal} onClose={() => onCloseHandler() }>
        <Modal.Header>Delete Confirmation</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Do you sure you wanna to delete order(order id : {props.orderid})?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ () =>  onDeleteOrderHandler()}>Yes</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;