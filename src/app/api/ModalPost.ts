import axios, {AxiosInstance} from 'axios';
import {ICalcModal} from "@/app/api/ICalcModal";
import {IPlanModal} from "@/app/api/IPlanModal";
import {IServiceModal} from "@/app/api/IServiceModal";

const MODAL_URL = 'http://localhost:8080'

export const createApiInstance = (
    baseURL: string,
): AxiosInstance => {
    return axios.create({
        baseURL: baseURL
    });
};

const modal = createApiInstance(MODAL_URL);

export default class ModalService {
    static async caclPost({place, square, type, name, phone}: {
        place?: string,
        square: string,
        type: string,
        name: string,
        phone: string
    }): Promise<void> {
        await modal.post<ICalcModal>('/calc', {place, square, type, name, phone});
    }

    static async planPost(projectType: string, name: string, phone: string): Promise<void> {
        await modal.post<IPlanModal>('/layout', {projectType, name, phone});
    }

    static async servicePost(service: 'Ремонт' | 'Стройка', type: string, name: string, phone: string): Promise<void> {
        await modal.post<IServiceModal>('/service', {service, name, type, phone});
    }

}